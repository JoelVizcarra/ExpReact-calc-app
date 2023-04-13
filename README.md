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
5. The functionality to buy credits is not yet developed as it involves roles and authorization, so you will have to create a balance for your user and add credits manually:

   5.1 you can connect using the client of your preference or using the pgAdmin instance that comes with the project (http://localhost:9000)

- username: admin@example.com
- password: password

6. Login in http://localhost:3000/login and start performing operations
