import { Publisher, Topics, Event } from '@rickjms/microservices-common';

interface SystemEvent extends Event {
  topic: Topics.SystemEvents;
  data: {
    id: string;
    timestamp: Date;
    details: string;
  };
}

export class SystemEventsPublisher extends Publisher<SystemEvent> {
  topic: Topics.SystemEvents = Topics.SystemEvents;
}
