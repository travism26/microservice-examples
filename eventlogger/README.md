# What does this do?

- This service is a `Event-Driven` microservice that listens to events from a Kafka topic.
- This service listens to the `system-events` topic, logs and stores the events in a MongoDB database.

# Break down of all the attributes

- Event ID: A unique identifier for the event.
- Timestamp: The date and time when the event occurred.
- Event Type: A categorization of the event (e.g., user_signup, user_login, security_alert, data_update).
- User ID: The identifier of the user associated with the event, if applicable.
- Username: The username of the user involved in the event, if applicable.
- Source IP: The IP address from which the event originated.
- Event Description: A detailed description of the event.
- Service Name: The name of the microservice where the event occurred.
- Severity Level: The severity of the event (e.g., INFO, WARN, ERROR, CRITICAL).
- Location: The geographical location associated with the event, if applicable.
- Correlation ID: An identifier to correlate this event with other related events.
- Request ID: The identifier of the request that triggered the event.
- Response Status: The status code or result of the event (e.g., success, failure).
- Payload: Any relevant data or payload associated with the event.
- User Agent: Information about the user's device or browser.
- Session ID: The session identifier, if applicable.
- Application Version: The version of the application at the time of the event.
- Additional Metadata: Any other relevant metadata specific to your application or event type.

# Logs (For reference)

1. I send a sign-up request to the auth service. (User: 'test2@test.com')
2. The auth service sends a sign-in event to the event logger.
3. The event logger receives the event and logs it to the console.
4. I send another sign-in request to the auth service. (User: 'test@test.com')
5. The auth service sends sign-in event to the event logger.
6. The event logger receives the event, saves it to the database, and logs it to the console.

```
[auth] User created and JWT generated
[auth] Publishing user created event
[auth] Producer found
[auth] Event published to topic system-events
[eventlogger] Message received: system-events / system-events-group
[eventlogger] SystemEventsConsumer - onMessage() -> Event data: {
[eventlogger]   eventId: 'event-1721724815015',
[eventlogger]   timestamp: '2024-07-23T08:53:35.015Z',
[eventlogger]   eventType: 'user_signup',
[eventlogger]   userId: '669f6f8eb9c848d5e1c3bb8d',
[eventlogger]   username: 'test2@test.com',
[eventlogger]   sourceIp: '192.168.65.3',
[eventlogger]   eventDescription: 'User created',
[eventlogger]   serviceName: 'auth-service',
[eventlogger]   severityLevel: 'INFO',
[eventlogger]   applicationVersion: '1.0.0',
[eventlogger]   additionalMetadata: { userAgent: 'PostmanRuntime/7.40.0' }
[eventlogger] }
[eventlogger] Saving event: event-1721724815015
[eventlogger] Event saved successfully
[auth] User signed in and JWT generated
[auth] Publishing user signed in event
[auth] Producer found
[auth] Event published to topic system-events
[eventlogger] Message received: system-events / system-events-group
[eventlogger] SystemEventsConsumer - onMessage() -> Event data: {
[eventlogger]   eventId: 'event-1721724824749',
[eventlogger]   timestamp: '2024-07-23T08:53:44.749Z',
[eventlogger]   eventType: 'user_signin',
[eventlogger]   userId: '669f6c40b9c848d5e1c3bb89',
[eventlogger]   username: 'test@test.com',
[eventlogger]   sourceIp: '192.168.65.3',
[eventlogger]   eventDescription: 'User signed in',
[eventlogger]   serviceName: 'auth-service',
[eventlogger]   severityLevel: 'INFO',
[eventlogger]   applicationVersion: '1.0.0',
[eventlogger]   additionalMetadata: { userAgent: 'PostmanRuntime/7.40.0' }
[eventlogger] }
[eventlogger] Saving event: event-1721724824749
[eventlogger] Event saved successfully
```
