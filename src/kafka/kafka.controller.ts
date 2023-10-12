import { Controller, Post, Body, Get } from '@nestjs/common';
import { createEmailNumberDto } from './dto/emailNumber.dto';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Controller()
export class KafkaController {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
  ) {}

  @Post('send')
  async SendToQueue(@Body() body: createEmailNumberDto) {
    return this.producerService.SendToQueue(body);
  }

  @Get('get')
  async getData() {
    return this.consumerService.getData();
  }
}
