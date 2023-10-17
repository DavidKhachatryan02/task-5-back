import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TYPE_ORM_CONFIG_ASYNC } from 'src/config/typeOrmConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TYPE_ORM_CONFIG_ASYNC),
    AuthModule,
    KafkaModule,
  ],
})
export class AppModule {}
