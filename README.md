# CodeTogether MERN Setup

This project is the backend foundation for a GitHub + WhatsApp style collaboration app.

## Features

- User authentication with JWT
- Repository creation and membership logic
- Repository-specific chat rooms
- Real-time messaging with Socket.IO
- MongoDB data models for users, repos, and messages

## Tech stack

- MongoDB + Mongoose
- Express.js
- React + JSX frontend
- Socket.IO
- Node.js

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a local MongoDB instance or update your connection string in `.env`.

3. Copy `.env.example` to `.env` and change values as needed:
   ```bash
   cp .env.example .env
   ```

4. Start the API:
   ```bash
   npm run dev
   ```

## API routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Repositories
- `GET /api/repos`
- `POST /api/repos`
- `GET /api/repos/:id`
- `POST /api/repos/:id/join`
- `GET /api/repos/:id/members`

### Messages
- `GET /api/messages/:repoId`
- `POST /api/messages/:repoId`

## Real-time events

- `join-repo`
- `typing`
- `send-message`
- `new-message`

## Notes

Your existing `CodeTogetherLanding.jsx` file is the frontend landing page. This backend is the next step for the MERN app and will support real repository membership and chat features.

## Next step

Next, we can build the React frontend pages for:
- login/signup
- repo dashboard
- repository chat room
- project members panel
