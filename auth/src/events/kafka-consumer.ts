import { Kafka, Consumer as KafkaConsumer, EachMessagePayload } from 'kafkajs';
import { Topics } from './topics';
import { Event } from './event';

export abstract class Consumer<T extends Event> {
  abstract topic: Topics;
  abstract onMessage(data: T['data']): void;
  protected consumer: KafkaConsumer;
  protected groupId: string;

  constructor(client: Kafka, groupId: string) {
    this.groupId = groupId;
    this.consumer = client.consumer({ groupId: this.groupId });
  }

  async connect(): Promise<void> {
    await this.consumer.connect();
  }

  async listen() {
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        console.log(`Message received: ${this.topic} / ${this.groupId}`);
        if (payload.message.value) {
          const parsedData = this.parseMessage(payload.message.value);
          this.onMessage(parsedData);
        } else {
          console.error('Received null message value');
        }
      },
    });
  }

  parseMessage(data: Buffer): any {
    return JSON.parse(data.toString());
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }
}
