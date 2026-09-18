# CodeTogether

CodeTogether is a GitHub + WhatsApp inspired collaboration workspace. Each repository has its own members, chat, activity feed, and project controls.

## Current implementation

### Frontend

The React/Vite frontend is in `client/` and currently works without a database:

- repository switching and search
- local repository creation
- repository-scoped chat
- member presence panel
- activity view
- invite flow placeholder
- browser persistence through `localStorage`
- responsive UI

### Backend

The root contains the Node/Express/Socket.IO backend foundation. MongoDB is deliberately optional for the current UI phase and can be connected later through the existing models and routes.

## Run the frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run the backend later

```bash
npm install
cp .env.example .env
npm run dev
```

The backend exposes authentication, repository, message, and Socket.IO room foundations. Connect the frontend to those APIs when MongoDB is ready.

## Structure

```text
client/src/App.jsx
client/src/components/
client/src/data/demoData.js
client/src/main.jsx
client/src/index.css
server.js
config/
models/
routes/
middleware/
sockets/
```
