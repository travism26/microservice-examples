import { Kafka } from 'kafkajs';
import { Consumer, Topics, SystemEvent } from '@rickjms/microservices-common';
import eventProcessor from '../../processors/event-processor';

export class SystemEventsConsumer extends Consumer<SystemEvent> {
  topic: Topics.SystemEvents = Topics.SystemEvents;

  constructor(client: Kafka) {
    super(client, 'system-events-group');
  }

  // Method to handle incoming messages
  // This method will be called for each message received by the consumer
  async onMessage(data: SystemEvent['data']) {
    console.log('SystemEventsConsumer - onMessage() -> Event data:', data);
    // Process the incoming event data here
    eventProcessor.processEvent(data);
  }
}
