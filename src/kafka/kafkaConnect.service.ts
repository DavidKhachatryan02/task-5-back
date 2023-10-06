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
    // Sending message by creating topic with message
    await this.consumerService.connect(topic);
  }

  async run() {
    // Sending message by creating topic with message
    await this.consumerService.run();
  }
}
