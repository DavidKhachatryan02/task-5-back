import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { KafkaSendController } from './kafkaSend.controller';
import { KafkaService } from './kafkaSend.service';
import { Email } from 'src/kafka/entity/email.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [ProducerService, ConsumerService, KafkaService],
  controllers: [KafkaSendController],
  exports: [ProducerService, ConsumerService, KafkaService],
})
export class KafkaModule {}
