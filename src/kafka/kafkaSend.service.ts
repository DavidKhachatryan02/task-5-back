import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';

const generateMassages = (count: number) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    const key = i.toString();
    const value = Math.random().toString(36).substring(7);
    array.push({ key, value });
  }
  return array;
};

@Injectable()
export class KafkaService {
  constructor(private readonly producerService: ProducerService) {}
  async SendToQueue() {
    const massages = generateMassages(100);
    console.log(massages);
    for (let i = 0; i < massages.length; i++) {
      await this.producerService.send({
        topic: 'email',
        messages: [{ key: massages[i].key, value: massages[i].value }],
      });
      console.log(`massage ${massages[i].key} send to queue`);
    }
  }
}
