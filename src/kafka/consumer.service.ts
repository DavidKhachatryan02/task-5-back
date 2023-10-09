import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { CONSUMER_CONFIG, KAFKA_CONFIG, CONSUMER } from 'src/constants/config';

@Injectable()
export class ConsumerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly kafka = new Kafka(KAFKA_CONFIG);
  private readonly consumer = this.kafka.consumer(CONSUMER);

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }

  async onApplicationBootstrap() {
    await this.consumer.connect();
    await this.consumer.subscribe(CONSUMER_CONFIG);
    await this.consumer.run({
      eachBatchAutoResolve: true,
      eachBatch: async ({ batch, commitOffsetsIfNecessary }) => {
        for (const message of batch.messages) {
          console.log({
            topic: batch.topic,
            partition: batch.partition,
            message: {
              offset: message.offset,
              value: message.value.toString(),
            },
          });
          await commitOffsetsIfNecessary();
        }
      },
    });
  }
}
