import { Injectable } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class KafkaConnect {
  constructor(private readonly consumerService: ConsumerService) {}
  async run() {
    await this.consumerService.run();
  }
}
