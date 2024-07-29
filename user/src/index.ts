import mongoose from 'mongoose';
import { app } from './app';
import { kafkaWrapper } from './kafka-wrapper';
import { UserCreatedConsumer } from './events/consumers/user-created-listener';
import { RedisClient } from './redis-client';

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
    console.log('Connected to MongoDB');

    // Initialize Redis if REDIS_HOST is defined
    if (process.env.REDIS_HOST) {
      RedisClient.getInstance();
      console.log('Connected to Redis');
    } else {
      console.warn('REDIS_HOST is not defined, not using Redis cache');
    }
  } catch (err) {
    console.error('Error starting up:', err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000, user service is running...');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    await shutdown();
  });
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await shutdown();
  });
};

const shutdown = async () => {
  if (process.env.REDIS_HOST) {
    await RedisClient.disconnect();
  }
  process.exit(0);
};

start();
