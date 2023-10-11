import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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

  @Get('get/:startFrom')
  async getData(@Param('startFrom') startFrom: number) {
    return this.consumerService.getData(startFrom);
  }

  @Get('findlast')
  async continue() {
    return this.consumerService.findLast();
  }
}
