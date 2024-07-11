import { Publisher } from './kafka-publisher';
import { Topics } from './topics';
import { Event } from './event';

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
