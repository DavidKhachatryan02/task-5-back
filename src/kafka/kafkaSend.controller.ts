import { Controller, Post, Body } from '@nestjs/common';
import { KafkaService } from './kafkaSend.service';
import { createEmailNumberDto } from './dto/emailNumber.dto';

@Controller('send')
export class KafkaSendController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post()
  async SendToQueue(@Body() body: createEmailNumberDto) {
    return this.kafkaService.SendToQueue(body);
  }
}
