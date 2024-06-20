# microservice-examples (Work in progress)
I am planning on creating a nodejs project that will be a good starting point for creating a microservice application. This will be a good Template for creating a microservice application.

# Project structure
The project will have the following services:
- Auth service
- User service (Not implemented yet)
- MORE TO COME

# Pre-requisites
- Docker
- Kubernetes (comes with Docker Desktop)
- Skaffold (`brew install skaffold`)
    - Skaffold is a tool that facilitates continuous development for Kubernetes applications. You can iterate on your application source code locally then deploy to local or remote Kubernetes clusters.
- helm (`brew install helm`)
- ingress-nginx [Install instructions](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)

# How to run locally
1. Clone the repository
    - Create secrets for the service:
        - `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdasd`
2. Edit hosts file to add the domain name
    - `sudo nano /etc/hosts`
    - Add the following line: `127.0.0.1 example-app.com`
3. Run `skaffold dev` to start the development environment
4. Ensure your browser does NOT have the dns cached version of `example-app.com` by restarting the browser or clearing the cache or open in incognito mode ;)
5. Visit `http://example-app.com/api/users/currentuser` in your browser you should see a response from the auth service: `currentUser:	"You are not logged in"`

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