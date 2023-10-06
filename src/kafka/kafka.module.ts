import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { KafkaSendController } from './kafkaSend.controller';
import { KafkaService } from './kafkaSend.service';

@Module({
  providers: [ProducerService, ConsumerService, KafkaService],
  controllers: [KafkaSendController],
  exports: [ProducerService, ConsumerService, KafkaService],
})
export class KafkaModule {}
