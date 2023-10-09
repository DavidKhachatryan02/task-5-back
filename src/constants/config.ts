import { ConsumerSubscribeTopics } from 'kafkajs';

export const TOPICS = { EMAIL: 'email' };

export const CONSUMER_CONFIG: ConsumerSubscribeTopics = {
  topics: ['email'],
  fromBeginning: true,
};

export const KAFKA_CONFIG = {
  clientId: 'user',
  brokers: ['localhost:9092'],
};

export const CONSUMER = { groupId: 'emails', maxBytes: 2000 };
