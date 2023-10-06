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
  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }

  async onApplicationBootstrap() {
    await this.consumer.connect();
    console.log('CONSUMER CONNECTRED');
    await this.consumer.subscribe(CONSUMER_CONFIG);
    console.log('CONSUMER subsribed');
  }
  private readonly kafka = new Kafka(KAFKA_CONFIG);

  consumer = this.kafka.consumer(GROUPID);

  async run() {
    await this.consumer.run({
      eachMessage: async (result) => {
        console.log('MESSANGE', result.message.key.toString());
      },
    });
  }
}
