import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { KafkaController } from './kafka.controller';
// import { KafkaService } from './kafka.service';
import { Email } from 'src/kafka/entity/email.entity';
import { KafkaGetController } from './kafkaGet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [ProducerService, ConsumerService],
  controllers: [KafkaController, KafkaGetController],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
