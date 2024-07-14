import { Kafka } from 'kafkajs';

// The KafkaWrapper class is designed to encapsulate the Kafka client configuration and initialization logic.
// By creating a singleton object of this class, we ensure that there is only one instance of the Kafka client
// throughout the application. This approach has several benefits:

// 1. Resource Efficiency: Initializing the Kafka client can be resource-intensive, involving network connections
//    and configurations. A singleton ensures that these resources are allocated once, reducing overhead.

// 2. Consistency: Having a single instance of the Kafka client ensures that all parts of the application
//    interact with Kafka in a consistent manner, using the same client configuration and connection.

// 3. Easy Access: The singleton object can be easily imported and used across different modules in the application,
//    simplifying the codebase by avoiding the need to pass the client instance around.

// 4. Simplified Management: Managing the lifecycle (such as connection and disconnection) of the Kafka client
//    becomes simpler, as it's centralized to a single point in the application.

// The `kafkaWrapper` singleton object is created at the bottom of this file and exported for use throughout
// the application. It initializes the Kafka client with the provided broker address from the environment variables,
// ensuring that the client is ready to use immediately upon import.
class KafkaWrapper {
  private _client: Kafka;

  constructor(broker: string) {
    this._client = new Kafka({
      clientId: 'auth',
      brokers: [broker],
    });
  }

  getClient() {
    return this._client;
  }
}

export const kafkaWrapper = new KafkaWrapper(process.env.KAFKA_BROKER!);
