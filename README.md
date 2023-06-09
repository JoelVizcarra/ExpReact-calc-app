# ExpReact-calc-app

Simple Express TS - React Redux Saas calculator app

- Client: Backend Docs URL http://localhost:3000
- App API: Backend Docs URL http://localhost:8000/docs

## Installation

1. Copy and rename the .env.example files to .env (for /backend and /frontend)

2. Build services

```bash
  docker-compose up -d --build
```

3. Run migrations

```bash
  docker exec -it calc-app-backend sh -c "npm run db:push"
```

4. Register an user in http://localhost:3000/signup
5. The functionality to buy credits is not yet developed as it involves roles and authorization, you can update the balance for your user, the structure of the Balance table is very simple, you only need to update the credits field with the number of credits you want, for testing purposes each user starts with 30 credits.

You can connect to the database using the client of your preference or using the pgAdmin instance that comes with the project (http://localhost:9000)

pgAdmin credentials:

    - username: admin@example.com
    - password: password

database credentials:

    - host (for pgAdmin and docker containers): calc-app-postgres
    - host (for outside docker): 127.0.0.1
    - port: 5432
    - username: user
    - password: password

6. Login at http://localhost:3000/login and start performing operations
