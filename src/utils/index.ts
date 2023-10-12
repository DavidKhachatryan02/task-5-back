import { Message } from 'kafkajs';

export const generateMassages = (count: number): Message[] => {
  const array = [];
  for (let i = 0; i < count; i++) {
    const key = Math.random() > 0.5 ? 1 : 0;
    const value = Math.random().toString(36).substring(7);
    array.push({ key: key.toString(), value });
  }
  return array;
};
