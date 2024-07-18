# Auth service

This is the authentication service. It is responsible for registering a user, logging in a user, logging out a user, refreshing a token, and verifying a token. The service uses JWT for token generation. The secret is stored in the environment variable or secrets in k8s.

## Tech stack

- Node.js
- Express
- MongoDB
- Redis
- Docker
- Kubernetes
- Jest

## How to run

Run within a cluster using k8s its `gooder` just create a secret for the jwt secret and the mongo uri. Then apply the k8s files in the infra folder. Once the service is up and running you can hit the endpoints using curl:

```bash
kubectl get service
NAME                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
auth-nodeport-srv   NodePort    xx.xx.xxx.xxx    <none>        3000:31515/TCP   62m
```

```bash
curl --header "Content-Type: application/json" \
--request POST \
--data '{ "email": "mtravis@ca.test.com", "password": "supersecure" }' \
http://localhost:31515/api/users/signup
```

### Create the secret for the JWT secret

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdasd
```

## How to test

1. Run `npm run test`

## How to build

1. Run `npm run build`

## How to run in production

1. Run `npm run start`

## How to run in docker

1. Run `docker build -t auth-service .`
2. Run `docker run -p 3000:3000 auth-service`

## commands used to create the project

```bash
npm init -y
npm tsc --init
```

# Kafka Messages sent

As of now I added two events to the system-events topic. One for user created and one for user signed in. The messages are sent to the topic when a user is created and when a user signs in. The messages are consumed by the system-events Consumer. (Also on this auth service for demonstration purposes)

```
[auth] Listening on port 3000
[auth] User created and JWT generated
[auth] Publishing user created event
[auth] Producer found
[auth] Message received: system-events / system-events-group
[auth] SystemEventsConsumer - onMessage() -> Event data: {
[auth]   id: '6698d9c6617de138e41eb5aa',
[auth]   timestamp: '2024-07-18T09:00:54.385Z',
[auth]   details: 'User created'
[auth] }
[auth] Event published to topic system-events
[auth] User signed in and JWT generated
[auth] Publishing user signed in event
[auth] Producer found
[auth] Message received: system-events / system-events-group
[auth] SystemEventsConsumer - onMessage() -> Event data: {
[auth]   id: '6698d9c6617de138e41eb5aa',
[auth]   timestamp: '2024-07-18T09:01:15.674Z',
[auth]   details: 'User signed in'
[auth] }
[auth] Event published to topic system-events
```
