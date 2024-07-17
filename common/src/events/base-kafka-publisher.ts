import { Kafka, Producer } from 'kafkajs';
import { Event } from './event';

export abstract class Publisher<T extends Event> {
  abstract topic: T['topic'];
  private producer: Producer;

  constructor(client: Kafka) {
    this.producer = client.producer();
  }

  async connect(): Promise<void> {
    console.log('Connecting to Kafka producer...');
    await this.producer.connect();
    console.log('Connected to Kafka producer');
  }

  // T['data'] is the type of the data property of the generic type T
  // In this case, T is an instance of the Event.data: any
  async publish(data: T['data']): Promise<void> {
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: JSON.stringify(data) }],
    });
    console.log(`Event published to topic ${this.topic}`);
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }
}
