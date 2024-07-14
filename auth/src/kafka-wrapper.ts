import { Kafka, KafkaConfig } from 'kafkajs';

class KafkaWrapper {
  private static _instance: KafkaWrapper;
  private _client: Kafka | null = null;

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
}

// Function to build and initialize the KafkaWrapper singleton
// function buildKafkaWrapper(brokers: string[], options?: KafkaConfig) {
//   const instance = KafkaWrapper.getInstance();
//   instance.initialize(brokers, options);
//   return instance;
// }

// Example usage
// const kafkaWrapper = buildKafkaWrapper(['localhost:9092'], { ssl: true });
// Exporting the singleton KafkaWrapper instance for use throughout the application (e.g., in consumers and publishers)
export const kafkaWrapper = new KafkaWrapper();
