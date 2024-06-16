# microservice-examples
I am planning on creating a nodejs project that will be a good starting point for creating a microservice application. 

# Design ideas
- I want both async and sync communication between services
    - I want to use a message broker for async communication (Kafka, RabbitMQ, etc.)
    - I want to use REST for sync communication
- I want to use a database for storing data (Postgres, mongoDB)
- I want to use a caching layer (Redis)
- I want to use a service discovery tool (Consul, etcd) <-- Maybe not needed
- I will use Ingress Controller for routing traffic to services
- Testing will be done using Jest
- I will use Docker for containerization
- I will use Kubernetes for orchestration
## This is later down the road
- I will use Helm for package management
- I will use Prometheus for monitoring
- I will use Grafana for visualization

# Phase 1
Build the authentication service I will try to create a production ready service that will have the following features:
- Register a user
- Login a user
- Logout a user
- Refresh token
- Verify token
- I will use JWT for token generation the secret will be stored in the environment variable or secrets in k8s

# Phase 2
- Build the user service that will be responsible for user data.


