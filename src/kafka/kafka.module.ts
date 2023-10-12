import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { KafkaController } from './kafka.controller';
// import { KafkaService } from './kafka.service'; //!FOR INIT KAFKA
import { Email } from 'src/kafka/entity/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [ProducerService, ConsumerService],
  controllers: [KafkaController],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
