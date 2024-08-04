import mongoose from 'mongoose';
import { app } from './app';
import { SystemEventsPublisher } from './events/systemEventsPublisher';
import { UserCreatedEventPublisher } from './events/userCreatedEventPublisher';
import { kafkaWrapper } from './kafka-wrapper';

const start = async () => {
  console.log('Starting up...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  // let systemEventsConsumer: SystemEventsConsumer | null = null;
  let systemEventsProducer: SystemEventsPublisher | null = null;

  if (process.env.KAFKA_BROKER) {
    try {
      // Build and initialize the KafkaWrapper singleton
      // this is a better approach to handle the Kafka client
      const clientId = process.env.KAFKA_CLIENT_ID || 'auth';
      await kafkaWrapper.initialize([process.env.KAFKA_BROKER], clientId);
      await kafkaWrapper.addProducer(
        'system-events-producer',
        new SystemEventsPublisher(kafkaWrapper.getClient())
      );
      await kafkaWrapper.addProducer(
        'user-created-event-producer',
        new UserCreatedEventPublisher(kafkaWrapper.getClient())
      );
      systemEventsProducer = kafkaWrapper.getProducer(
        'system-events-producer'
      ) as SystemEventsPublisher;
    } catch (err) {
      console.error('Error during Kafka consumer startup:', err);
      // You might want to exit here if Kafka is critical to your app
    }
  } else {
    console.warn(
      'KAFKA_BROKER not defined. Kafka consumer will not be started.'
    );
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }

  // const shutdown = async () => {
  //   console.log('Shutting down...');
  //   if (systemEventsProducer) {
  //     await systemEventsProducer.disconnect();
  //     console.log('Kafka Producer disconnected');
  //   }
  //   process.exit(0); // Exit the process with a success code
  // };

  // process.on('SIGINT', shutdown);
  // process.on('SIGTERM', shutdown);

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
