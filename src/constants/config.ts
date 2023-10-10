import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConsumerConfig, ConsumerSubscribeTopics, KafkaConfig } from 'kafkajs';
import { Email } from 'src/kafka/entity/email.entity';

export const TOPICS = { EMAIL: 'email' };

export const CONSUMER_CONFIG: ConsumerSubscribeTopics = {
  topics: ['email'],
  fromBeginning: true,
};

export const KAFKA_CONFIG: KafkaConfig = {
  clientId: 'user',
  brokers: ['localhost:9092'],
};

export const CONSUMER: ConsumerConfig = { groupId: 'emails', maxBytes: 2000 };

export const TYPE_ORM_CONFIG: TypeOrmModuleOptions = {
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
};
