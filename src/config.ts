// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConsumerConfig, ConsumerSubscribeTopics, KafkaConfig } from 'kafkajs';
// import { Email } from 'src/kafka/entity/email.entity';
// import { TOPICS } from './constants';

// export const CONSUMER_CONFIG: ConsumerSubscribeTopics = {
//   topics: [TOPICS.EMAIL],
//   fromBeginning: true,
// };

// export const KAFKA_CONFIG: KafkaConfig = {
//   clientId: 'user',
//   brokers: ['localhost:9092'],
// };

// export const CONSUMER: ConsumerConfig = { groupId: 'emails', maxBytes: 2000 };

// const host = process.env.DB_HOST;
// const port = parseInt(process.env.DB_PORT, 10);
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// const database = process.env.DB_DATABASE;
// const entities = [Email];

// export const TYPE_ORM_CONFIG: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host,
//   port,
//   username,
//   password,
//   database,
//   entities,
//   insecureAuth: true,
//   synchronize: true,
//   autoLoadEntities: true,
// };

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConsumerConfig, ConsumerSubscribeTopics, KafkaConfig } from 'kafkajs';
import { Email } from 'src/kafka/entity/email.entity';
import { TOPICS } from './constants';

export const CONSUMER_CONFIG: ConsumerSubscribeTopics = {
  topics: [TOPICS.EMAIL],
  fromBeginning: true,
};

export const KAFKA_CONFIG: KafkaConfig = {
  clientId: 'user',
  brokers: ['localhost:9092'],
};

export const CONSUMER: ConsumerConfig = { groupId: 'emails', maxBytes: 2000 };

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
