import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { CONSUMER_CONFIG, KAFKA_CONFIG, GROUPID } from 'src/constants/config';

@Injectable()
export class ConsumerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly kafka = new Kafka(KAFKA_CONFIG);
  private readonly consumer = this.kafka.consumer(GROUPID);

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }

  async onApplicationBootstrap() {
    await this.consumer.connect();
    console.log('CONSUMER CONNECTRED');
    await this.consumer.subscribe(CONSUMER_CONFIG);
    console.log('CONSUMER subsribed');
    await this.consumer.run({
      eachBatchAutoResolve: true,
      eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
        for (const message of batch.messages) {
          console.log({
            topic: batch.topic,
            partition: batch.partition,
            highWatermark: batch.highWatermark,
            message: {
              offset: message.offset,
              key: message.key.toString(),
              value: message.value.toString(),
            },
          });
          resolveOffset(message.offset);
          await heartbeat();
        }
      },
    });
  }
}
