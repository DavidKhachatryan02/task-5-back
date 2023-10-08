import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Admin, Kafka, Producer, ProducerRecord } from 'kafkajs';
import { GROUPID, KAFKA_CONFIG, TOPICS } from 'src/constants/config';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka(KAFKA_CONFIG);

  private readonly producer: Producer = this.kafka.producer();
  private readonly admin: Admin = this.kafka.admin();

  async onModuleInit() {
    await this.producer.connect();
    await this.admin.connect();
    await this.admin.createPartitions({
      timeout: 100,
      topicPartitions: [{ topic: TOPICS.EMAIL, count: 2 }],
    });
  }

  async send(message: ProducerRecord) {
    await this.producer.send(message);
  }

  async onApplicationShutdown() {
    await this.admin.deleteTopicRecords({
      topic: TOPICS.EMAIL,
      partitions: [
        { partition: 0, offset: '-1' },
        { partition: 1, offset: '-1' },
      ],
    });
    await this.admin.deleteGroups([GROUPID.toString()]);
    await this.admin.deleteTopics({
      topics: [TOPICS.EMAIL],
    });
    await this.producer.disconnect();
    await this.admin.disconnect();
  }
}
