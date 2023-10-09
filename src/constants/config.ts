import { ConsumerConfig, ConsumerSubscribeTopics, KafkaConfig } from 'kafkajs';

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
