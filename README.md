# microservice-examples
I am planning on creating a nodejs project that will be a good starting point for creating a microservice application. This will be a good Template for creating a microservice application.

# Project structure
The project will have the following services:
- Auth service
- User service (Not implemented yet)
- MORE TO COME

# How to run
1. Clone the repository
    - Create secrets for the services:
        - `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdasd`
2. Navigate to the service you want to run (`cd auth` or `cd user`)
3. Build Docker image
    - Run `docker build -t auth-service $DOCKER_USERNAME/auth-service` or `docker build -t user-service $DOCKER_USERNAME/user-service`
4. Need to update the `infra/k8s/auth-depl.yaml` or `infra/k8s/user-depl.yaml` with the correct image name (Change the image name to `$DOCKER_USERNAME/auth-service` or `$DOCKER_USERNAME/user-service`)
5. Run `kubectl apply -f infra/k8s` to deploy the service to k8s
    - for dev create the nodeport services `kubectl apply -f infra/dev`

# System Design
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


# A lot of the stuff learned from this project will be from the following sources:
One course that I learned a lot from is stephen grider's microservices course on udemy. I will be using a lot of the concepts learned from that course in this project. I highly recommend anyone starting with microservices to take this course. I am not affiliated with Stephen Grider in any way. I just think he is a great teacher and this course is worth mentioning. [Stephen Grider's Microservices course](https://www.udemy.com/course/microservices-with-node-js-and-react/).