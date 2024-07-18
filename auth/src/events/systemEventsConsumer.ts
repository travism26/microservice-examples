import { Kafka } from 'kafkajs';
import { Consumer, Event, Topics } from '@rickjms/microservices-common';

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

  // Method to handle incoming messages
  // This method will be called for each message received by the consumer
  onMessage(data: SystemEvent['data']): void {
    console.log('SystemEventsConsumer - onMessage() -> Event data:', data);
    // Process the incoming event data here
  }
}
