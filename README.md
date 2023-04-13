# ExpReact-calc-app

Simple Express TS - React Redux Saas calculator app

## Installation

Copy and rename the .env.example files to .env (for /backend and /frontend)

Build services

```bash
  docker-compose up -d --build
```

Run migrations

```bash
  docker exec -it calc-app-backend sh -c "npm run db:push"
```

- Backend Docs URL http://localhost:8000/docs
- Frontend URL http://localhost:3000/signup
