# JobFlow

JobFlow — web-приложение для управления асинхронными задачами с очередью, ретраями и статусами выполнения.

Проект создан для глубокого понимания:

- работы асинхронного кода (Promise, async/await, очереди)
- строгой типизации в TypeScript
- проектирования backend API
- взаимодействия frontend ↔ backend
- работы с SQL и деплоя приложений

## Stack

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- SQL (без ORM)

### Frontend

- React
- TypeScript

### Infrastructure

- Docker
- docker-compose

## Key Features (в разработке)

- Очередь задач с лимитом параллельности
- Retry и timeout для асинхронных задач
- Статусы задач (pending / processing / done / failed)
- Централизованная обработка ошибок
- UI для управления задачами
