import { Kafka } from 'kafkajs';
import {
  Consumer,
  Topics,
  UserCreatedEvent,
} from '@rickjms/microservices-common';
import { User } from '../../models/user';

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
  topic: Topics.UserCreated = Topics.UserCreated;

  constructor(client: Kafka) {
    super(client, 'user-created-consumer-group');
  }

  // Method to handle incoming messages
  // This method will be called for each message received by the consumer
  async onMessage(data: UserCreatedEvent['data']) {
    console.log(' - onMessage() -> Event data:', data);
    // we can add some validation here to check if the user already exists
    const existingUser = await User.findById(data.userId);
    if (existingUser) {
      console.log(' - onMessage() -> User already exists:', existingUser);
      return;
    }
    // do some security checks:
    //  - ip address is not blacklisted
    //  - email is not blacklisted
    //  - sourceService is valid i.e. it is a service that we trust
    //  - etc
    // Need to process the incoming event data here by creating a new user
    console.log(' - onMessage() -> Creating a new user...');
    const newUser = User.build({ id: data.userId, email: data.email });
    await newUser.save();
    console.log(' - onMessage() -> New user saved:', newUser);
  }
}
