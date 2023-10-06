import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';
import { KafkaSendController } from './kafka/kafkaSend.controller';
import { KafkaService } from './kafka/kafkaSend.service';
import { KafkaConnectController } from './kafka/kafkaConnect.controller';
import { KafkaConnect } from './kafka/kafkaConnect.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    KafkaModule,
  ],
  controllers: [KafkaSendController, KafkaConnectController],
  providers: [ProducerService, ConsumerService, KafkaService, KafkaConnect],
})
export class AppModule {}
