import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { generateMassages } from '../utils';
import { createEmailNumberDto } from './dto/emailNumber.dto';
import { TOPICS } from 'src/constants/config';
import { Message } from 'kafkajs';

@Injectable()
export class KafkaService {
  constructor(private readonly producerService: ProducerService) {}
  async SendToQueue(body: createEmailNumberDto) {
    const massages = generateMassages(body.number);

    let massagesToSend: Message[] = [];

    for (let i = 0; i < massages.length; i += 100) {
      massagesToSend = massages.slice(i, i + 100);

      await this.producerService.sendBatch({
        topicMessages: [{ topic: TOPICS.EMAIL, messages: [...massagesToSend] }],
      });

      console.error(`MESSAGE SEND ${massagesToSend.length} `);
      massagesToSend = [];
    }
  }
}
