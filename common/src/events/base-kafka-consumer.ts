import { Kafka, Consumer as KafkaConsumer, EachMessagePayload } from 'kafkajs';
import { Event } from './event'; // Importing Event interface for event type safety

// Abstract class Consumer to be extended by specific Kafka consumers
export abstract class Consumer<T extends Event> {
  abstract topic: T['topic']; // Abstract property to be defined with the specific Kafka topic
  abstract onMessage(data: T['data']): void; // Abstract method to handle incoming messages

  protected consumer: KafkaConsumer; // KafkaConsumer instance for consuming messages
  protected groupId: string; // Consumer group ID for this consumer

  // Constructor to initialize the consumer with a Kafka client and group ID
  constructor(client: Kafka, groupId: string) {
    this.groupId = groupId; // Setting the group ID
    this.consumer = client.consumer({ groupId: this.groupId }); // Initializing the KafkaConsumer with the group ID
  }

  // Connects the consumer to Kafka
  async connect(): Promise<void> {
    await this.consumer.connect(); // Connects the consumer instance to the Kafka broker
  }

  // Subscribes to the topic and listens for messages
  // not much error handling here, but i will add it later...
  async listen() {
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true }); // Subscribes to the specified topic from the beginning
    await this.consumer.run({
      // Runs the consumer to continuously listen for messages
      eachMessage: async (payload: EachMessagePayload) => {
        console.log(`Message received: ${this.topic} / ${this.groupId}`); // Logging received messages for debugging
        if (payload.message.value) {
          // Checks if the message has a value
          const parsedData = this.parseMessage(payload.message.value); // Parses the message value from Buffer to JSON
          this.onMessage(parsedData); // Calls the abstract onMessage method with the parsed data
        } else {
          console.error('Received null message value'); // Logs an error if the message value is null
        }
      },
    });
  }

  // Parses the message from Buffer to JSON
  parseMessage(data: Buffer): any {
    return JSON.parse(data.toString()); // Converts the Buffer to string then to JSON
  }

  // Disconnects the consumer from Kafka
  async disconnect(): Promise<void> {
    await this.consumer.disconnect(); // Disconnects the consumer instance from the Kafka broker
  }
}
