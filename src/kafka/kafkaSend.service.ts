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
      const partition = Math.random() > 0.5 ? 1 : 0;
      await this.producerService.send({
        topic: TOPICS.EMAIL,
        messages: [
          {
            key: partition.toString(),
            value: massages[i].value,
            partition: partition,
          },
        ],
      });
      console.error(`MESSAGE SEND ${massages[i].key} `);
    }
  }
}
