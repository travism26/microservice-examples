import { Publisher as oldPublisher } from './kafka-publisher';
import { Publisher, Topics, Event } from '@rickjms/microservices-common';
import { Topics as oldTopics } from './topics';
import { Event as oldEvent } from './event';

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
