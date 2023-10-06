import { Injectable } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerSubscribeTopics } from 'kafkajs';

const topic: ConsumerSubscribeTopics = {
  topics: ['email'],
  fromBeginning: true,
};

@Injectable()
export class KafkaConnect {
  constructor(private readonly consumerService: ConsumerService) {}
  async connect() {
    await this.consumerService.connect(topic);
  }

  async run() {
    await this.consumerService.run();
  }
}
