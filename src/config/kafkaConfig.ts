import { ConsumerConfig, ConsumerSubscribeTopics, KafkaConfig } from 'kafkajs';
import { TOPICS } from '../constants';

export const CONSUMER_CONFIG: ConsumerSubscribeTopics = {
  topics: [TOPICS.EMAIL],
  fromBeginning: true,
};

export const KAFKA_CONFIG: KafkaConfig = {
  clientId: 'user',
  brokers: ['localhost:9092'],
};

export const CONSUMER: ConsumerConfig = { groupId: 'emails', maxBytes: 2000 };
