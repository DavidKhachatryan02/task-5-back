import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { KafkaConnect } from './kafkaConnect.service';
import { KafkaSendController } from './kafkaSend.controller';
import { KafkaService } from './kafkaSend.service';
import { KafkaConnectController } from './kafkaConnect.controller';

@Module({
  providers: [ProducerService, ConsumerService, KafkaConnect, KafkaService],
  controllers: [KafkaSendController, KafkaConnectController],
  exports: [ProducerService, ConsumerService, KafkaConnect, KafkaService],
})
export class KafkaModule {}
