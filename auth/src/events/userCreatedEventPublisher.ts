import {
  Publisher,
  Topics,
  UserCreatedEvent,
} from '@rickjms/microservices-common';

export class UserCreatedEventPublisher extends Publisher<UserCreatedEvent> {
  topic: Topics.UserCreated = Topics.UserCreated;
}
