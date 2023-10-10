import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller('get')
export class KafkaGetController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get()
  async getData() {
    return this.consumerService.getData();
  }
}
