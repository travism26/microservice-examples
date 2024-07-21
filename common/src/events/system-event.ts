import { Topics } from './topics';

export interface SystemEvent {
  topic: Topics.SystemEvents;
  data: {
    id: string;
    timestamp: Date;
    details: string;
  };
}
