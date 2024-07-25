import mongoose from 'mongoose';
import { app } from './app';
import { kafkaWrapper } from './kafka-wrapper';
import { UserCreatedConsumer } from './events/consumers/user-created-listener';

const start = async () => {
  console.log('Starting up...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.KAFKA_BROKER) {
    throw new Error('KAFKA_BROKER must be defined');
  }
  if (!process.env.KAFKA_CLIENT_ID) {
    throw new Error('KAFKA_CLIENT_ID must be defined');
  }

  try {
    const clientId = process.env.KAFKA_CLIENT_ID || 'user';
    await kafkaWrapper.initialize([process.env.KAFKA_BROKER], clientId);
    await kafkaWrapper.addConsumer(
      'user-created-consumer',
      new UserCreatedConsumer(kafkaWrapper.getClient())
    );
    const userCreatedConsumer = kafkaWrapper.getConsumer(
      'user-created-consumer'
    ) as UserCreatedConsumer;
    await userCreatedConsumer.listen();
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('listening on port 3000 user service is running...');
  });
};

start();
