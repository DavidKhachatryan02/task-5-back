import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { generateMassages } from '../utils';
import { TOPICS } from 'src/constants/config';
import { createEmailNumberDto } from './dto/emailNumber.dto';

@Injectable()
export class KafkaService {
  constructor(private readonly producerService: ProducerService) {}
  async SendToQueue(body: createEmailNumberDto) {
    const massages = generateMassages(body.number);

    for (let i = 0; i < massages.length; i++) {
      await this.producerService.send({
        topic: TOPICS.EMAIL,
        messages: [{ key: massages[i].key, value: massages[i].value }],
      });
      console.error(`MESSAGE SEND ${massages[i].key} `);
    }
  }
}
