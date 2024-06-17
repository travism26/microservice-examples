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
Run within a cluster using k8s its `gooder` just create a secret for the jwt secret and the mongo uri. Then apply the k8s files in the infra folder.

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