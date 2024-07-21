import { Topics } from './topics';

// I dont like the name of this interface, but keeping it for now...
export interface SystemEvent {
  topic: Topics.SystemEvents;
  data: {
    id: string;
    timestamp: Date;
    details: string;
  };
}
