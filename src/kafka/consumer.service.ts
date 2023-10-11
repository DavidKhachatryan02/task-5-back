import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager, SelectQueryBuilder } from 'typeorm';
import { Kafka } from 'kafkajs';
import { CONSUMER_CONFIG, KAFKA_CONFIG, CONSUMER } from 'src/constants/config';
import { Email } from 'src/kafka/entity/email.entity';

@Injectable()
export class ConsumerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectEntityManager() private entitiyManager: EntityManager,
  ) {}
  private readonly kafka = new Kafka(KAFKA_CONFIG);
  private readonly consumer = this.kafka.consumer(CONSUMER);
  private readonly emailRepository = this.dataSource.getRepository(Email);
  private readonly updateQueryBuilder: SelectQueryBuilder<Email> =
    this.entitiyManager.createQueryBuilder();

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }

  async onApplicationBootstrap() {
    await this.emailRepository.clear(); //!clear this
    await this.consumer.connect();
    await this.consumer.subscribe(CONSUMER_CONFIG);
    await this.consumer.run({
      eachBatchAutoResolve: true,
      eachBatch: async ({ batch, commitOffsetsIfNecessary }) => {
        console.log(batch.messages.length);
        for (const message of batch.messages) {
          await this.emailRepository.save({
            email: message.value.toString(),
          });
          await commitOffsetsIfNecessary();
        }
      },
    });
  }

  async getData(startFrom: number) {
    const numberOfEmail = await this.emailRepository.count();
    const emailsReady = startFrom > numberOfEmail ? startFrom : numberOfEmail;

    //! NEED TO CHANGE LOGIC HERE

    const data = await this.updateQueryBuilder
      .update(Email)
      .set({ isSend: true })
      .where(`id<=${emailsReady}`)
      .execute();

    return data.affected; //! maybe + emailsReady
  }

  //!FIND OUT IF SULITION IS GOOD
  //!Logic is, if process is stoped, We will get last id of email send and continue from there

  async findLast() {
    const lastEmailSent = await this.emailRepository.findOne({
      where: { isSend: true },
      order: { id: 'DESC' },
    });

    return lastEmailSent;
  }
}
