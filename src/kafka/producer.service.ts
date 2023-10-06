import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  // Connect to Kafka Server
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
    //Send Records to Kafka to producer
    await this.producer.send(message);
    // const transaction = await this.producer.transaction();
    // await transaction.commit();
  }

  async onApplicationShutdown() {
    //Disconnect producer on Application ShutDown
    await this.producer.disconnect();
    await this.admin.disconnect();
  }
}
