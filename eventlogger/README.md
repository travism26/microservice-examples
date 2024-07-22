# What does this do?

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

1. I send a sign-up request to the auth service.
2. The auth service sends a sign-in event to the event logger.
3. The event logger receives the event and logs it to the console.
4. I send another sign-in request to the auth service.
5. The auth service sends another sign-in event to the event logger.
6. The event logger receives the event and logs it to the console.

```
[auth]
[auth] > auth@1.0.0 start
[auth] > ts-node-dev --poll src/index.ts
[auth]
[auth] [INFO] 22:00:03 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.5.3)
[eventlogger]
[eventlogger] > user@1.0.0 start
[eventlogger] > ts-node-dev --poll src/index.ts
[eventlogger]
[eventlogger] [INFO] 22:00:03 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.5.3)
[eventlogger] Starting up...
[eventlogger] (node:25) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
[eventlogger] (Use `node --trace-deprecation ...` to show where the warning was created)
[eventlogger] Connected to Kafka
[eventlogger] Consumer found
[eventlogger] {"level":"INFO","timestamp":"2024-07-21T22:00:06.453Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"system-events-group"}
[user]
[user] > user@1.0.0 start
[user] > ts-node-dev --poll src/index.ts
[user]
[user] [INFO] 22:00:04 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.5.3)
[auth] Starting up...
[auth] (node:25) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
[auth] (Use `node --trace-deprecation ...` to show where the warning was created)
[auth] Connected to Kafka
[auth] {"level":"WARN","timestamp":"2024-07-21T22:00:07.190Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
[auth] Connecting to Kafka producer...
[auth] Connected to Kafka producer
[auth] Producer found
[auth] Connected to MongoDB
[auth] Listening on port 3000
[user] Starting up...
[user] (node:25) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
[user] (Use `node --trace-deprecation ...` to show where the warning was created)
[user] Connected to mongoDB
[user] listening on port 3000 user service is running...
[eventlogger] {"level":"INFO","timestamp":"2024-07-21T22:00:09.494Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"system-events-group","memberId":"eventlogger-depl-5f94d66746-qprvn-b9a523f6-4d9c-45be-8d0d-eb56916fa501","leaderId":"eventlogger-depl-5f94d66746-qprvn-b9a523f6-4d9c-45be-8d0d-eb56916fa501","isLeader":true,"memberAssignment":{"system-events":[0]},"groupProtocol":"RoundRobinAssigner","duration":3040}
[eventlogger] Connected to mongoDB
[eventlogger] listening on port 3000 event logger service is running...
[auth] User created and JWT generated
[auth] Publishing user created event
[auth] Producer found
[eventlogger] Message received: system-events / system-events-group
[auth] Event published to topic system-events
[eventlogger] SystemEventsConsumer - onMessage() -> Event data: {
[eventlogger]   id: '669d850594d3ec7d153e0786',
[eventlogger]   timestamp: '2024-07-21T22:00:37.314Z',
[eventlogger]   details: 'User created'
[eventlogger] }
[auth] User signed in and JWT generated
[auth] Publishing user signed in event
[auth] Producer found
[eventlogger] Message received: system-events / system-events-group
[auth] Event published to topic system-events
[eventlogger] SystemEventsConsumer - onMessage() -> Event data: {
[eventlogger]   id: '669d850594d3ec7d153e0786',
[eventlogger]   timestamp: '2024-07-21T22:00:54.496Z',
[eventlogger]   details: 'User signed in'
[eventlogger] }
[auth] User signed in and JWT generated
[auth] Publishing user signed in event
[auth] Producer found
[auth] Event published to topic system-events
[eventlogger] Message received: system-events / system-events-group
[eventlogger] SystemEventsConsumer - onMessage() -> Event data: {
[eventlogger]   id: '669d850594d3ec7d153e0786',
[eventlogger]   timestamp: '2024-07-21T22:00:56.555Z',
[eventlogger]   details: 'User signed in'
[eventlogger] }
```
