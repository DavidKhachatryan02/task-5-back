import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConsumerSubscribeTopics, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }

  onApplicationBootstrap() {}
  private readonly kafka = new Kafka({
    clientId: 'user',
    brokers: ['localhost:9092'],
  });

  consumer = this.kafka.consumer({ groupId: '1' });

  async connect(topics: ConsumerSubscribeTopics) {
    await this.consumer.connect();
    console.log('CONSUMER CONNECTRED');
    await this.consumer.subscribe(topics);
    console.log('CONSUMER subsribed');
  }

  async run() {
    await this.consumer.run({
      eachMessage: async (result) => {
        console.log('MESSANGE', result.message.value.toString());
      },
    });
  }
}
