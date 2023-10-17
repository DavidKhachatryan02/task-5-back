import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TYPE_ORM_CONFIG } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPE_ORM_CONFIG),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env', //!Fix this
    }),
    KafkaModule,
  ],
})
export class AppModule {}
