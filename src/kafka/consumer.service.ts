import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Kafka } from 'kafkajs';
import { CONSUMER_CONFIG, KAFKA_CONFIG, CONSUMER } from 'src/constants/config';
import { Email } from 'src/kafka/entity/email.entity';

@Injectable()
export class ConsumerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  private readonly kafka = new Kafka(KAFKA_CONFIG);
  private readonly consumer = this.kafka.consumer(CONSUMER);
  private readonly emailRepository = this.dataSource.getRepository(Email);

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }

  async onApplicationBootstrap() {
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
    return await this.emailRepository.count();
  }
}
