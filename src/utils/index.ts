// import { TOPICS } from 'src/constants/config';
import { Message } from 'kafkajs';

export const generateMassages = (count: number): Message[] => {
  const array = [];
  for (let i = 0; i < count; i++) {
    const partition = Math.random() > 0.5 ? 1 : 0;
    // const key = i.toString();
    const value = Math.random().toString(36).substring(7);
    array.push({ value, partition });
  }
  return array;
};
