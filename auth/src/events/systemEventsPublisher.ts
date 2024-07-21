import { Publisher, Topics, SystemEvent } from '@rickjms/microservices-common';

export class SystemEventsPublisher extends Publisher<SystemEvent> {
  topic: Topics.SystemEvents = Topics.SystemEvents;
}
