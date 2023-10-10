import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { Email } from 'src/db/email.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      insecureAuth: true,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [Email],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
  ],
})
export class AppModule {}
