import { Topics } from './topics';

/**
 * Interface representing a user created event.
 * This event is triggered when a new user is created from the auth service.
 */
export interface UserCreatedEvent {
  /** The topic of the user created event. */
  topic: Topics.UserCreated;

  /** The data associated with the user created event. */
  data: {
    /**
     * A unique identifier for the event.
     * @type {string}
     */
    eventId: string;

    /**
     * The date and time when the event occurred.
     * @type {Date}
     */
    timestamp: Date;

    /**
     * The identifier of the user created.
     * @type {string}
     */
    userId: string;

    /**
     * The email of the user created.
     * @type {string}
     */
    email: string;

    /**
     * The IP address from which the event originated.
     * @type {string}
     * @optional
     */
    sourceIp?: string;

    /**
     * The name of the microservice where the event occurred.
     * @type {string}
     */
    sourceService: string;
  };
}
