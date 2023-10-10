import { Controller, Post, Body } from '@nestjs/common';
import { createEmailNumberDto } from './dto/emailNumber.dto';
import { ProducerService } from './producer.service';

@Controller('send')
export class KafkaController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async SendToQueue(@Body() body: createEmailNumberDto) {
    return this.producerService.SendToQueue(body);
  }
}
