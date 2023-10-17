import { ConsumerConfig, ConsumerSubscribeTopics, KafkaConfig } from 'kafkajs';
import { TOPICS } from 'src/constants';

export const CONSUMER_CONFIG: ConsumerSubscribeTopics = {
  topics: [TOPICS.EMAIL],
  fromBeginning: true,
};

export const KAFKA_CONFIG: KafkaConfig = {
  clientId: 'user',
  brokers: async () => {
    return [process.env.KAFKA_PORT];
  },
};

export const CONSUMER: ConsumerConfig = { groupId: 'emails', maxBytes: 2000 };
