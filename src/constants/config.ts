import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConsumerConfig, ConsumerSubscribeTopics, KafkaConfig } from 'kafkajs';
import { Email } from 'src/kafka/entity/email.entity';

export const TOPICS = { EMAIL: 'email' };

export const CONSUMER_CONFIG: ConsumerSubscribeTopics = {
  topics: [TOPICS.EMAIL],
  fromBeginning: true,
};

export const KAFKA_CONFIG: KafkaConfig = {
  clientId: 'user',
  brokers: ['localhost:9092'],
};

export const CONSUMER: ConsumerConfig = { groupId: 'emails', maxBytes: 2000 };

//! CHNAGE TO PROCESS ENV

export const TYPE_ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  insecureAuth: true,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'db',
  entities: [Email],
  synchronize: true,
  autoLoadEntities: true,
};
