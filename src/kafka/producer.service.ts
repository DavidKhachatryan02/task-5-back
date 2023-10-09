import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerBatch } from 'kafkajs';
import { KAFKA_CONFIG } from 'src/constants/config';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka(KAFKA_CONFIG);

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendBatch(messages: ProducerBatch) {
    await this.producer.sendBatch(messages);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
