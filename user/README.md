# User Service Setup
- Copy some files from auth service just to get started
    - `package.json`, `tsconfig.json`, `Dockerfile`, `.dockerignore`, `src/test/*`, `src/app.ts`, `src/index.ts`
- Update all files that need to be updated.
    - `package.json`, `src/app.ts`, `src/index.ts`
# User Service Routes
Here are some of the routes that I plan on implementing for the user service:

| Route             | Method | Body                                  | Goal                      |
|-------------------|--------|---------------------------------------|---------------------------|
| `/api/users`      | GET    | None                                  | Retrieve all users        |
| `/api/users/:id`  | GET    | None                                  | Retrieve a single user    |
| `/api/users`      | POST   | `{ "name": "string", "email": "string" }` | Create a new user         |
| `/api/users/:id`  | PUT    | `{ "name": "string", "email": "string" }` | Update an existing user   |
| `/api/users/:id`  | DELETE | None                                  | Delete an existing user   |

# Build and push the Docker image
- Build the Docker image
    - `docker build -t $DOCKER_USERNAME/user .`
- Push the Docker image
    - `docker push $DOCKER_USERNAME/user`
