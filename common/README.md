# Commands used to build and package up the library

```commandline
# Install the npm package
npm install @rickjms/microservices-common

# Update library rebuild and publish it
# Commit all changes to github:
git add .; git commit -m "UPDATE"; git push REPO BRANCH_NAME
npm run pub
# This is an alias for the following command:
npm version patch && npm run build && npm publish
```

# Examples

## Consumer Example

Below is an example of how to use the library in a service. I created a consumer class that extends the Consumer class from the common library. The consumer class is responsible for consuming messages from a Kafka topic. The onMessage method is called for each message received by the consumer. The onMessage method is where you would process the incoming event data.

```typescript
import { Kafka } from 'kafkajs';
import { Consumer, Topics, SystemEvent } from '@rickjms/microservices-common';
import eventProcessor from '../../processors/event-processor';

export class SystemEventsConsumer extends Consumer<SystemEvent> {
  topic: Topics.SystemEvents = Topics.SystemEvents;

  constructor(client: Kafka) {
    super(client, 'system-events-group'); // The second argument is the consumer group id
  }

  // Method to handle incoming messages
  // This method will be called for each message received by the consumer
  async onMessage(data: SystemEvent['data']) {
    console.log('SystemEventsConsumer - onMessage() -> Event data:', data);
    // Process the incoming event data here
    eventProcessor.processEvent(data);
  }
}
```

## Producer Example

Below is an example of how to use the library in a service. I created a producer class that extends the Producer class from the common library. The producer class is responsible for producing messages to a Kafka topic. The send method is used to send messages to the topic.

```typescript
import { Publisher, Topics, SystemEvent } from '@rickjms/microservices-common';

export class SystemEventsPublisher extends Publisher<SystemEvent> {
  topic: Topics.SystemEvents = Topics.SystemEvents;
}
```

## Interface Example

Below is an example of how to use the library in a service. I created an interface that extends the Event interface from the common library. The interface is used to define the structure of the event data.

```typescript
import { Topics } from './topics';

export interface SystemEvent {
  topic: Topics; // The topic the event belongs to in this case 'system-events' kafka topic
  data: {
    ... // Define the structure of the event data here
  }
}
```

## Wire up kakfa to service

I wrote a blog post on how to wire up kafka to a service. You can find the blog post [here](https://www.travisallister.com/post/integrating-kafka-into-your-kubernetes-microservice-application).

# Notes

The common directory is designed to be a shared package across all services, facilitating common functionalities and utilities.

# License

MIT License

Copyright (c) 2024 travis martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
