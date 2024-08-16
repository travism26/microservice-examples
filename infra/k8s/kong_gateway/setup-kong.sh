#!/bin/bash

# Define the Kong Admin API endpoint
KONG_ADMIN_API="http://localhost:8001"

# Function to create a service
create_service() {
  local name=$1
  local url=$2
  curl -i -X POST $KONG_ADMIN_API/services/ \
    --data name=$name \
    --data url=$url
}

# Function to create a route
create_route() {
  local service=$1
  local host=$2
  local path=$3
  curl -i -X POST $KONG_ADMIN_API/services/$service/routes \
    --data 'hosts[]='$host \
    --data 'paths[]='$path
}

# Create services
create_service "auth-srv" "http://auth-srv.default.svc.cluster.local"
create_service "user-srv" "http://user-srv.default.svc.cluster.local"
create_service "client-srv" "http://client-srv.default.svc.cluster.local"

# Create routes
create_route "auth-srv" "example-app.com" "/api/auth/?(.*)"
create_route "user-srv" "example-app.com" "/api/user/?(.*)"
create_route "client-srv" "example-app.com" "/?(.*)"

echo "Kong routes and services have been configured."
