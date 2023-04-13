# ExpReact-calc-app

Simple Express TS - React Redux Saas calculator app

- Client: Backend Docs URL http://localhost:3000
- App API: Backend Docs URL http://localhost:8000/docs

# University APP

DB.json API with an RTK + MUI React App as client

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
5. The functionality to buy credits is not yet developed as it involves roles and authorization, so you will have to create a balance for your user and add credits manually, the structure of the table is very simple, you only need to fill the fields userId with the ID of your user and the credits field with the credits you want to have, 30 credits will be enough for testing.

You can connect to the database using the client of your preference or using the pgAdmin instance that comes with the project (http://localhost:9000)

pgAdmin credentials:

    - username: admin@example.com
    - password: password

database credentials:

    - host (for pgAdmin and coker containers): calc-app-pgadmin
    - host (for poutside docker): 127.0.0.1
    - port: 5432
    - username: user
    - password: password

6. Login at http://localhost:3000/login and start performing operations
