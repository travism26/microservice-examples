import { Kafka, Producer } from 'kafkajs';
import { Subjects } from './subjects';
import { Event } from './event';

export abstract class Publisher<T extends Event> {
  abstract subject: Subjects;
  private producer: Producer;

  constructor(client: Kafka) {
    this.producer = client.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async publish(data: T['data']): Promise<void> {
    await this.producer.send({
      topic: this.subject,
      messages: [{ value: JSON.stringify(data) }],
    });
    console.log(`Event published to subject ${this.subject}`);
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }
}
