import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Message, Partitioners, Producer } from 'kafkajs';
import { KAFKA_CONFIG, TOPICS } from 'src/constants/config';
import { createEmailNumberDto } from './dto/emailNumber.dto';
import { generateMassages } from 'src/utils';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka(KAFKA_CONFIG);

  private readonly producer: Producer = this.kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  async onModuleInit() {
    await this.producer.connect();
  }

  async SendToQueue(body: createEmailNumberDto) {
    const massages = generateMassages(body.number);
    let massagesToSend: Message[] = [];
    for (let i = 0; i < massages.length; i += 100) {
      massagesToSend = massages.slice(i, i + 100);

      await this.producer.sendBatch({
        topicMessages: [{ topic: TOPICS.EMAIL, messages: [...massagesToSend] }],
      });
      console.error(`MESSAGE SEND ${massagesToSend.length} `);
      massagesToSend = [];
    }
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
