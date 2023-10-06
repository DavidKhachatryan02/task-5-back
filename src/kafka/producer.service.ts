import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    clientId: 'user',
    brokers: ['localhost:9092'],
  });
  admin = this.kafka.admin();

  producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.admin.connect();
    await this.producer.connect();
    await this.admin.createTopics({
      topics: [
        {
          topic: 'email',
        },
      ],
    });
  }

  async send(message: ProducerRecord) {
    await this.producer.send(message);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
    await this.admin.disconnect();
  }
}
