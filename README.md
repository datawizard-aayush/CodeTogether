# CodeTogether

CodeTogether is a local-first collaboration workspace inspired by GitHub and WhatsApp: repositories have their own team chat, members, activity, and project controls.

## Current phase: frontend first

The React client currently runs without MongoDB, Express, or authentication services. It uses seeded demo data and `localStorage`, so you can build and test the experience immediately:

- repository switcher
- repository search
- local repository creation
- repository-specific chat
- persisted messages between refreshes
- members panel
- invite modal placeholder
- activity view
- responsive workspace UI

MongoDB and the API scaffold are intentionally kept for the later integration phase.

## Run the frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000`.

To reset the local demo state, use the **Reset** button in the sidebar or clear the `codetogether_demo_state` value from browser local storage.

## Later MERN integration

The root contains the planned Express/Mongoose/Socket.IO backend scaffold. When the UI is ready, the next integration will replace the local state layer with:

- MongoDB user, repository, member, and message models
- JWT login and registration
- REST repository and message APIs
- Socket.IO repository rooms and typing events
- real invitations and permissions

## Project structure

```text
CodeTogetherLanding.jsx   # original standalone design
client/                    # current local-first React app
config/                    # later MongoDB configuration
middleware/                # later auth middleware
models/                    # later Mongoose models
routes/                    # later Express routes
sockets/                   # later Socket.IO events
server.js                  # later API entry point
```
