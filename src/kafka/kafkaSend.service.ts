import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { generateMassages } from '../utils';
import { TOPICS } from 'src/constants/config';

@Injectable()
export class KafkaService {
  constructor(private readonly producerService: ProducerService) {}
  async SendToQueue() {
    const massages = generateMassages(100);

    for (let i = 0; i < massages.length; i++) {
      await this.producerService.send({
        topic: TOPICS.EMAIL,
        messages: [{ key: massages[i].key, value: massages[i].value }],
      });
      console.log(`massage ${massages[i].key} send to queue`);
    }
  }
}
