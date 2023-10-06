import { Controller, Get } from '@nestjs/common';
import { KafkaConnect } from './kafkaConnect.service';

@Controller('get')
export class KafkaConnectController {
  constructor(private readonly kafkaConnect: KafkaConnect) {}

  @Get()
  async getMessage() {
    return this.kafkaConnect.connect();
  }

  @Get('run')
  async runRead() {
    return this.kafkaConnect.run();
  }
}
