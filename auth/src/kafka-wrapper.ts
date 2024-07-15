import { Kafka, KafkaConfig, ProducerConfig, ConsumerConfig } from 'kafkajs';
import { Publisher } from './events/kafka-publisher';
import { Consumer } from './events/kafka-consumer';
import { Event } from './events/event';

class KafkaWrapper {
  private static _instance: KafkaWrapper;
  private _client: Kafka | null = null;
  private _producers: Map<string, Publisher<Event>> = new Map();
  private _consumers: Map<string, Consumer<Event>> = new Map();

  /**
   * Gets the singleton instance of the KafkaWrapper.
   * If the instance does not exist, it creates one and returns it.
   * @returns {KafkaWrapper} The singleton instance of the KafkaWrapper.
   */
  static getInstance(): KafkaWrapper {
    if (!KafkaWrapper._instance) {
      KafkaWrapper._instance = new KafkaWrapper();
    }
    return KafkaWrapper._instance;
  }

  /**
   * Initializes the Kafka client with the provided broker addresses and optional configuration.
   * If the client is already initialized, it resolves immediately.
   * @param {string[]} brokers - The list of broker addresses.
   * @param {KafkaConfig} [options] - Optional Kafka configuration.
   * @returns {Promise<void>} A promise that resolves when the client is successfully initialized or rejects with an error.
   */
  initialize(brokers: string[], options?: KafkaConfig): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this._client) {
        this._client = new Kafka({
          clientId: 'auth',
          brokers,
          ...options,
        });

        // Use the admin client to check the connection
        const admin = this._client.admin();
        admin
          .connect()
          .then(() => {
            console.log('Connected to Kafka');
            resolve();
          })
          .catch((err) => {
            console.error('Failed to connect to Kafka', err);
            reject(err);
          });
      } else {
        // If the client is already initialized, resolve immediately
        resolve();
      }
    });
  }

  /**
   * Returns the Kafka client instance.
   * Throws an error if the client is not initialized.
   * @returns {Kafka} The Kafka client instance.
   * @throws {Error} If the Kafka client is not initialized.
   */
  getClient(): Kafka {
    if (!this._client) {
      throw new Error('Kafka client is not initialized');
    }
    return this._client;
  }

  async addProducer(id: string, producer: Publisher<Event>) {
    await producer.connect();
    this._producers.set(id, producer);
  }

  async addConsumer(id: string, consumer: Consumer<Event>) {
    await consumer.connect();
    this._consumers.set(id, consumer);
  }

  getProducer(id: string): Publisher<Event> {
    if (!this._producers.has(id)) {
      if (!this._client) {
        throw new Error('Kafka client is not initialized');
      }
      throw new Error(`Producer ${id} is not found`);
    }
    console.log('Producer found');
    return this._producers.get(id)!;
  }

  getConsumer(id: string): Consumer<Event> {
    if (!this._consumers.has(id)) {
      if (!this._client) {
        throw new Error('Kafka client is not initialized');
      }
      throw new Error(`Consumer ${id} is not found`);
    }
    console.log('Consumer found');
    return this._consumers.get(id)!;
  }
}

export const kafkaWrapper = new KafkaWrapper();
