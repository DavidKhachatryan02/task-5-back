import {
  Injectable,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager, SelectQueryBuilder } from 'typeorm';
import { Kafka } from 'kafkajs';
import {
  CONSUMER_CONFIG,
  KAFKA_CONFIG,
  CONSUMER,
} from 'src/config/kafkaConfig';
import { Email } from 'src/kafka/entity/email.entity';

@Injectable()
export class ConsumerService
  implements
    OnApplicationBootstrap,
    BeforeApplicationShutdown,
    OnApplicationShutdown
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

  async beforeApplicationShutdown() {
    const lastEmailSent = await this.emailRepository.findOne({
      where: { isSend: true },
      order: { id: 'DESC' },
    });
    if (!lastEmailSent) return;

    await this.updateQueryBuilder
      .update(Email)
      .set({ isStoped: true })
      .where(`id=${lastEmailSent.id}`)
      .execute();
  }

  async onApplicationShutdown() {
    await this.consumer.stop();
    await this.consumer.disconnect();
  }

  async onApplicationBootstrap() {
    await this.emailRepository.clear(); //! to clear DB//
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

  async getData() {
    console.time('DATAGET');
    const numberOfEmail = await this.emailRepository.count();

    let whereStart = await this.emailRepository.findOne({
      where: { isSend: false },
    });

    const whereStoped = await this.emailRepository.findOne({
      where: { isStoped: true },
    });

    if (whereStoped) {
      await this.updateQueryBuilder
        .update(Email)
        .set({ isStoped: null })
        .where(`id=${whereStoped.id}`)
        .execute();

      whereStart = whereStoped;
    }

    if (!whereStart) return { total: numberOfEmail };

    if (whereStoped) {
      return { stoped: whereStoped }; //!maybe this must be not here
    }
    const data = await this.updateQueryBuilder
      .skip(whereStart.id)
      .take(numberOfEmail - whereStart.id)
      .update(Email)
      .set({ isSend: true })
      .execute();
    console.timeEnd('DATAGET');
    return {
      done: data.affected - whereStart.id,
      startedFrom: whereStart,
    };
  }
}
