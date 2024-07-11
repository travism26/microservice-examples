import { Kafka } from 'kafkajs';
import { Consumer } from './kafka-consumer';
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

export class SystemEventsConsumer extends Consumer<SystemEvent> {
  topic: Topics.SystemEvents = Topics.SystemEvents;

  constructor(client: Kafka) {
    super(client, 'system-events-group');
  }

  onMessage(data: SystemEvent['data']): void {
    console.log('Event data:', data);
    // Process the event data here
  }
}
