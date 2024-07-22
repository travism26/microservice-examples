import { Topics } from './topics';

/**
 * Interface representing a system event.
 */
export interface SystemEvent {
  /** The topic of the system event. */
  topic: Topics.SystemEvents;

  /** The data associated with the system event. */
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
     * A categorization of the event (e.g., user_signup, user_login, security_alert, data_update).
     * @type {string}
     */
    eventType: string;

    /**
     * The identifier of the user associated with the event, if applicable.
     * @type {string}
     * @optional
     */
    userId?: string;

    /**
     * The username of the user involved in the event, if applicable.
     * @type {string}
     * @optional
     */
    username?: string;

    /**
     * The IP address from which the event originated.
     * @type {string}
     * @optional
     */
    sourceIp?: string;

    /**
     * A detailed description of the event.
     * @type {string}
     */
    eventDescription: string;

    /**
     * The name of the microservice where the event occurred.
     * @type {string}
     */
    serviceName: string;

    /**
     * The severity of the event (e.g., INFO, WARN, ERROR, CRITICAL).
     * @type {string}
     */
    severityLevel: string;

    /**
     * The geographical location associated with the event, if applicable.
     * @type {string}
     * @optional
     */
    location?: string;

    /**
     * An identifier to correlate this event with other related events.
     * @type {string}
     * @optional
     */
    correlationId?: string;

    /**
     * The identifier of the request that triggered the event.
     * @type {string}
     * @optional
     */
    requestId?: string;

    /**
     * The status code or result of the event (e.g., success, failure).
     * @type {string}
     * @optional
     */
    responseStatus?: string;

    /**
     * Any relevant data or payload associated with the event.
     * @type {string}
     * @optional
     */
    payload?: string;

    /**
     * Information about the user's device or browser.
     * @type {string}
     * @optional
     */
    userAgent?: string;

    /**
     * The session identifier, if applicable.
     * @type {string}
     * @optional
     */
    sessionId?: string;

    /**
     * The version of the application at the time of the event.
     * @type {string}
     */
    applicationVersion: string;

    /**
     * Any other relevant metadata specific to your application or event type.
     * @type {object}
     * @optional
     */
    additionalMetadata?: object;
  };
}
