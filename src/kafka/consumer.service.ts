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
      autoCommitThreshold: 100,
      autoCommitInterval: 5000,
      // eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      //   console.log({
      //     topic,
      //     partition: partition.toString(),
      //     value: message.value.toString(),
      //   });
      // },
      eachBatchAutoResolve: true,
      eachBatch: async ({ batch, commitOffsetsIfNecessary }) => {
        console.log(`Got ${batch.messages.length} MESSAGES`);
        for (const message of batch.messages) {
          // console.log({
          //   topic: batch.topic,
          //   partition: batch.partition,
          //   message: {
          //     offset: message.offset,
          //     value: message.value.toString(),
          //   },
          // });
          await commitOffsetsIfNecessary();
        }
      },
    });
  }
}
