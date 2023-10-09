import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { KAFKA_CONFIG } from 'src/constants/config';

// const partitaner = [
//   { partitionId: 1, leader: 1 },
//   { partitionId: 0, leader: 0 },
// ];

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka(KAFKA_CONFIG);

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async send(messages: ProducerRecord) {
    await this.producer.sendBatch(messages);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
