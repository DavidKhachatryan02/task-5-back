import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafkaSend.service';

@Controller('send')
export class KafkaSendController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get()
  async SendToQueue() {
    return this.kafkaService.SendToQueue();
  }
}
