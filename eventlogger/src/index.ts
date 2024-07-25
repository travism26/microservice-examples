import mongoose from 'mongoose';
import { kafkaWrapper } from './kafka-wrapper';
import { SystemEventsConsumer } from './events/consumers/system-event-listener';
import { app } from './app';

const start = async () => {
  console.log('Starting up...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.KAFKA_BROKER) {
    console.warn(
      'KAFKA_BROKER not defined. Kafka consumer will not be started.'
    );
    throw new Error('KAFKA_BROKER must be defined');
  }

  // Enforcing this check to ensure that the client ID is always defined and unique
  // this should be from:
  /**
   * - name: KAFKA_CLIENT_ID
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
   */
  if (!process.env.KAFKA_CLIENT_ID) {
    throw new Error('KAFKA_CLIENT_ID must be defined');
  }

  const clientId = process.env.KAFKA_CLIENT_ID || 'eventlogger';
  await kafkaWrapper.initialize([process.env.KAFKA_BROKER], clientId);
  await kafkaWrapper.addConsumer(
    'system-events-consumer',
    new SystemEventsConsumer(kafkaWrapper.getClient())
  );
  const systemEventsConsumer = kafkaWrapper.getConsumer(
    'system-events-consumer'
  ) as SystemEventsConsumer;
  await systemEventsConsumer.listen();

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('listening on port 3000 event logger service is running...');
  });
};

start();
