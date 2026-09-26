# COLABZ — COMPLETE IMPLEMENTATION ROADMAP & MASTER BLUEPRINT

---

## 1. PROJECT VISION

**Colabz** is an all-in-one developer collaboration and project management platform designed specifically for students, software engineers, and open-source contributors. 

Inspired by the core concepts of **GitHub** (repository structure, issues, collaboration), **WhatsApp/Discord** (real-time chat, voice/video calls), and **Modern Kanban Project Management** (Trello/Jira), Colabz bridges the gap between coding and team communication in a single, unified workspace.

### Core Philosophy:
- **Learn MERN by Building**: Designed for beginners to master full-stack JavaScript incrementally.
- **Original UI/UX**: Developer-focused, dark-themed, sleek glassmorphism design with zero generic UI clones.
- **Clean Architecture**: Decoupled frontend (`client/`) and backend (`server/`) with REST APIs, Socket.IO web sockets, and peer-to-peer WebRTC connections.

---

## 2. FINAL FEATURE LIST

1. **Authentication & Security**: JWT-based auth, bcrypt password hashing, session management, protected frontend & backend routes.
2. **User Profiles**: Custom avatars, developer bio, tech stack tags, social links (GitHub/LinkedIn), and project history.
3. **Repository/Project Management**: Create public/private repos, tech stack tags, project settings, README display, and file explorer.
4. **Role-Based Access Control (RBAC)**: Roles (`OWNER`, `ADMIN`, `MEMBER`, `VIEWER`) with strict permission boundaries.
5. **Project Dashboard**: Unified tabbed interface for Overview, Repository, Tasks, Issues, Members, Activity, Chat, and Settings.
6. **Task Management (Kanban)**: Drag-and-drop or status-driven columns (`TODO`, `IN_PROGRESS`, `IN_REVIEW`, `COMPLETED`) with priority levels and due dates.
7. **Issue Tracker**: GitHub-style issue creation, label management (`bug`, `feature`, `urgent`), assignees, and comment threads.
8. **Simplified File System**: Virtual repository browser allowing users to view, upload, download, and delete project files/folders.
9. **Real-Time Project Chat & Direct Messages**: Socket.IO-powered room chats, 1-on-1 private messaging, typing indicators, online/offline presence, and unread badges.
10. **WebRTC 1-on-1 Voice & Video Calling**: Low-latency peer-to-peer audio/video calling using Socket.IO signaling, mute/unmute, and camera toggle.
11. **Notifications System**: In-app and real-time alerts for project invites, task assignments, issue mentions, and incoming calls.
12. **Activity Timeline**: Chronological log of team actions (e.g., "Rahul created issue #4", "Amit updated README").
13. **Global Search**: Instant search for users, projects, and repositories with filtering.
14. **Responsive UI/UX**: Dark mode by default, mobile/desktop responsiveness, loading skeletons, and toast notifications.

---

## 3. TECHNOLOGY STACK

### Frontend
- **Framework**: React.js (Bootstrapped with Vite)
- **Language**: JavaScript (ES6+)
- **Routing**: React Router DOM (v6+)
- **HTTP Client**: Axios (with interceptors for JWT injection)
- **State Management**: Context API (AuthContext, SocketContext, CallContext)
- **Styling**: Modern Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphic overlays)
- **Real-Time Client**: `socket.io-client`
- **Icons**: `lucide-react`

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Security & Auth**: `jsonwebtoken`, `bcryptjs`, `cors`, `helmet`, `express-rate-limit`
- **Real-Time Server**: `socket.io`
- **File Uploads**: `multer`
- **Environment Management**: `dotenv`

### Database
- **Database Engine**: MongoDB (Local MongoDB / MongoDB Atlas)
- **Object Data Modeling (ODM)**: Mongoose (Schemas, Models, Middlewares, Population)

### Real-Time & P2P Media
- **WebSockets**: Socket.IO (Signaling, Chat, Presence, Notifications)
- **Voice/Video**: WebSockets + WebRTC (`RTCPeerConnection`, `navigator.mediaDevices.getUserMedia`)

---

## 4. SYSTEM ARCHITECTURE

```text
                               +-----------------------------+
                               |     Client Browser (React)  |
                               |    (Runs on Port 5173/Host) |
                               +--------------+--------------+
                                              |
                     +------------------------+------------------------+
                     | (HTTP REST Requests)   | (WebSocket Events)     | (P2P Audio/Video)
                     v                        v                        v
          +----------+----------+   +----------+----------+   +----------+----------+
          |  Express REST API   |   |   Socket.IO Server   |   | WebRTC Direct Peer  |
          |  (Port 5000/Host)   |   |   (Port 5000/Host)   |   |    Connection (UDP) |
          +----------+----------+   +----------+----------+   +---------------------+
                     |                        |
                     +-----------+------------+
                                 | (Mongoose ODM)
                                 v
                     +-----------+------------+
                     |    MongoDB Database    |
                     |   (Port 27017/Atlas)   |
                     +------------------------+
```

### Documentation Roadmap (`docs/`):
- `docs/PROJECT_REQUIREMENTS.md` → Created in **Phase 0**
- `docs/SYSTEM_ARCHITECTURE.md` → Created in **Phase 0**
- `docs/DATABASE_DESIGN.md` → Created in **Phase 4**
- `docs/API_DOCUMENTATION.md` → Created in **Phase 5**
- `docs/AUTHENTICATION_FLOW.md` → Created in **Phase 6**
- `docs/SOCKET_ARCHITECTURE.md` → Created in **Phase 12**
- `docs/WEBRTC_ARCHITECTURE.md` → Created in **Phase 14**
- `docs/DEPLOYMENT_GUIDE.md` → Created in **Phase 16**

---

## 5. DATABASE ARCHITECTURE

### Collections Overview:

1. **`users`**:
   - Fields: `_id`, `name`, `username`, `email`, `password` (hashed), `avatar`, `bio`, `skills` (Array), `socialLinks` (`github`, `linkedin`), `createdAt`, `updatedAt`
   - Indexes: Unique index on `email` and `username`.

2. **`projects`**:
   - Fields: `_id`, `name`, `description`, `visibility` (`PUBLIC`/`PRIVATE`), `owner` (Ref `User`), `tags` (Array), `readmeContent`, `createdAt`, `updatedAt`
   - Indexes: Compound index on `owner` and `name`. Text index on `name`, `description`, `tags`.

3. **`projectMembers`**:
   - Fields: `_id`, `project` (Ref `Project`), `user` (Ref `User`), `role` (`OWNER`, `ADMIN`, `MEMBER`, `VIEWER`), `joinedAt`
   - Indexes: Unique compound index on `{ project: 1, user: 1 }` to prevent duplicate membership.

4. **`tasks`**:
   - Fields: `_id`, `project` (Ref `Project`), `title`, `description`, `status` (`TODO`, `IN_PROGRESS`, `IN_REVIEW`, `COMPLETED`), `priority` (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), `assignee` (Ref `User`), `creator` (Ref `User`), `dueDate`, `createdAt`
   - Indexes: Index on `project` and `status`.

5. **`issues`**:
   - Fields: `_id`, `project` (Ref `Project`), `issueNumber` (Auto-increment per project), `title`, `description`, `status` (`OPEN`, `CLOSED`), `labels` (Array), `assignee` (Ref `User`), `creator` (Ref `User`), `createdAt`
   - Indexes: Index on `project` and `status`.

6. **`issueComments`**:
   - Fields: `_id`, `issue` (Ref `Issue`), `author` (Ref `User`), `content`, `createdAt`
   - Indexes: Index on `issue`.

7. **`files`**:
   - Fields: `_id`, `project` (Ref `Project`), `name`, `path`, `isFolder` (Boolean), `size`, `mimeType`, `uploadedBy` (Ref `User`), `createdAt`
   - Indexes: Index on `project` and `path`.

8. **`conversations`**:
   - Fields: `_id`, `type` (`PROJECT`, `DIRECT`), `project` (Ref `Project`, optional), `participants` (Array of Ref `User`), `lastMessage` (Ref `Message`), `updatedAt`
   - Indexes: Index on `participants`.

9. **`messages`**:
   - Fields: `_id`, `conversation` (Ref `Conversation`), `sender` (Ref `User`), `content`, `attachments` (Array), `readBy` (Array of Ref `User`), `createdAt`
   - Indexes: Index on `conversation` and `createdAt`.

10. **`notifications`**:
    - Fields: `_id`, `recipient` (Ref `User`), `sender` (Ref `User`), `type` (`INVITE`, `TASK_ASSIGNED`, `ISSUE_ASSIGNED`, `MESSAGE`, `MENTION`), `project` (Ref `Project`, optional), `message`, `isRead` (Boolean), `createdAt`
    - Indexes: Index on `recipient` and `isRead`.

11. **`activities`**:
    - Fields: `_id`, `project` (Ref `Project`), `user` (Ref `User`), `action` (String e.g., "created issue #3"), `createdAt`
    - Indexes: Index on `project` and `createdAt`.

### Avoiding Data Duplication:
Instead of embedding members inside the `Project` document, we use a separate `projectMembers` junction collection. This prevents document size overflow (16MB BSON limit) and simplifies querying user memberships efficiently.

---

## 6. API ARCHITECTURE

### Authentication APIs
| Method | Endpoint | Description | Auth Required? |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user details | Yes |
| `POST` | `/api/auth/logout` | Clear user session token | Yes |

### User Profile APIs
| Method | Endpoint | Description | Auth Required? |
|---|---|---|---|
| `GET` | `/api/users/profile/:username` | Fetch user public profile | Yes |
| `PUT` | `/api/users/profile` | Update profile information & bio | Yes |
| `POST` | `/api/users/avatar` | Upload avatar image (Multer) | Yes |

### Project APIs
| Method | Endpoint | Description | Auth Required? | Required Role |
|---|---|---|---|---|
| `POST` | `/api/projects` | Create a new project/repo | Yes | Any User |
| `GET` | `/api/projects` | List user projects | Yes | Any User |
| `GET` | `/api/projects/:id` | Get project dashboard info | Yes | Member |
| `PUT` | `/api/projects/:id` | Update project metadata | Yes | ADMIN / OWNER |
| `DELETE` | `/api/projects/:id` | Delete project | Yes | OWNER |

### Member APIs
| Method | Endpoint | Description | Auth Required? | Required Role |
|---|---|---|---|---|
| `GET` | `/api/projects/:id/members` | Get project members | Yes | Member |
| `POST` | `/api/projects/:id/members` | Invite member by email/username | Yes | ADMIN / OWNER |
| `PUT` | `/api/projects/:id/members/:userId` | Update member role | Yes | OWNER |
| `DELETE` | `/api/projects/:id/members/:userId` | Remove member | Yes | ADMIN / OWNER |

### Task Management APIs
| Method | Endpoint | Description | Auth Required? | Required Role |
|---|---|---|---|---|
| `GET` | `/api/projects/:id/tasks` | Get project task list | Yes | Member |
| `POST` | `/api/projects/:id/tasks` | Create new task | Yes | Member |
| `PUT` | `/api/tasks/:taskId` | Update task status/priority/assignee | Yes | Member |
| `DELETE` | `/api/tasks/:taskId` | Delete task | Yes | ADMIN / OWNER |

### Issue Management APIs
| Method | Endpoint | Description | Auth Required? | Required Role |
|---|---|---|---|---|
| `GET` | `/api/projects/:id/issues` | Get project issues | Yes | Member |
| `POST` | `/api/projects/:id/issues` | Create new issue | Yes | Member |
| `PUT` | `/api/issues/:issueId` | Update issue state/assignee | Yes | Member |
| `POST` | `/api/issues/:issueId/comments` | Add comment to issue | Yes | Member |

### Repository File APIs
| Method | Endpoint | Description | Auth Required? | Required Role |
|---|---|---|---|---|
| `GET` | `/api/projects/:id/files` | Browse virtual file tree | Yes | Member |
| `POST` | `/api/projects/:id/files/upload` | Upload file to project | Yes | Member |
| `DELETE` | `/api/files/:fileId` | Delete file/folder | Yes | ADMIN / OWNER |

### Conversation & Chat APIs
| Method | Endpoint | Description | Auth Required? |
|---|---|---|---|
| `GET` | `/api/conversations` | Get user chat threads | Yes |
| `GET` | `/api/conversations/:id/messages` | Fetch message history for thread | Yes |

### Notifications & Search APIs
| Method | Endpoint | Description | Auth Required? |
|---|---|---|---|
| `GET` | `/api/notifications` | Fetch user notifications | Yes |
| `PUT` | `/api/notifications/read` | Mark notifications as read | Yes |
| `GET` | `/api/search` | Search users, projects, and repos | Yes |

---

## 7. SOCKET.IO ARCHITECTURE

### Room Structure:
- **`user:<userId>`**: User's private channel for notifications and call signaling.
- **`project:<projectId>`**: Room for project-wide real-time chat, task updates, and activity logs.
- **`conversation:<conversationId>`**: Room for direct 1-on-1 chats.

### Event Mapping:

| Event Name | Direction | Payload | Purpose |
|---|---|---|---|
| `setup` | Client -> Server | `{ userId }` | Joins user's private notification room |
| `join_project` | Client -> Server | `{ projectId }` | Joins project chat & activity room |
| `send_message` | Client -> Server | `{ conversationId, content, sender }` | Broadcasts chat message to room |
| `receive_message` | Server -> Client | `{ messageObject }` | Real-time chat message delivery |
| `typing` | Client -> Server | `{ room, user }` | Broadcasts "User is typing..." |
| `stop_typing` | Client -> Server | `{ room, user }` | Clears typing indicator |
| `new_notification` | Server -> Client | `{ notificationObject }` | Real-time toast alert |
| `call_user` | Client -> Server | `{ userToCall, offer, name, callType }` | WebRTC call offer signaling |
| `incoming_call` | Server -> Client | `{ from, offer, name, callType }` | Notifies target user of incoming call |
| `answer_call` | Client -> Server | `{ to, answer }` | Sends WebRTC call acceptance answer |
| `call_accepted` | Server -> Client | `{ answer }` | Establishes WebRTC peer connection |
| `ice_candidate` | Both Ways | `{ candidate, targetUserId }` | Exchanges WebRTC NAT traversal candidates |
| `end_call` | Both Ways | `{ targetUserId }` | Terminates call session |

---

## 8. WEBRTC ARCHITECTURE

### Signaling & Peer Connection Flow:
```text
  [ User A (Caller) ]            [ Socket.IO Server ]           [ User B (Callee) ]
           |                              |                              |
  1. Click Call (Audio/Video)             |                              |
     Get UserMedia (Camera/Mic)           |                              |
           |                              |                              |
  2. Create RTCPeerConnection             |                              |
     Create Offer (SDP)                   |                              |
           |---- emit("call_user") ------>|                              |
           |                              |---- emit("incoming_call") -->|
           |                              |                              |
           |                              |                     3. Incoming Call Ring
           |                              |                        Click Accept
           |                              |                        Get UserMedia
           |                              |                        Create RTCPeerConnection
           |                              |                        Set Remote Description
           |                              |                        Create Answer (SDP)
           |                              |<--- emit("answer_call") ------|
           |<--- emit("call_accepted") ---|                              |
  4. Set Remote Description               |                              |
           |                              |                              |
  5. Exchange ICE Candidates <===========>|=============================>|
           |                              |                              |
  ===================== DIRECT P2P MEDIA STREAM ESTABLISHED =====================
  (Audio/Video streams flow directly between browsers over UDP via WebRTC)
```

---

## 9. PHASE-WISE IMPLEMENTATION ROADMAP

---

### PHASE 0 — Project Planning, Requirements & Architecture

#### 1. Objective
Establish complete project clarity, define functional boundaries, set up architectural design blueprints, and prepare documentation standards.

#### 2. MERN Concepts to Learn
- What is full-stack web architecture?
- Decoupled client-server architecture vs Monolithic architecture.
- Document-based database design principles vs Relational SQL design.

#### 3. Colabz Features Implemented
- System Architecture design & requirements documentation.

#### 4. Technologies Used
- Markdown, Mermaid.js for diagrams.

#### 5. Backend Work
- Outline folder structure layout and configuration plans.

#### 6. Frontend Work
- Design component hierarchy and layout flow.

#### 7. Database Work
- Plan collections, schema types, and relationship boundaries.

#### 8. APIs
- Draft endpoint specifications.

#### 9. Socket/WebRTC
- Plan room naming conventions and call sequence diagrams.

#### 10. Files/Folders
- `docs/PROJECT_REQUIREMENTS.md`
- `docs/SYSTEM_ARCHITECTURE.md`

#### 11. Testing
- Review documentation for completeness.

#### 12. Git/GitHub
- Initialize Git repository structure and basic `.gitignore`.

#### 13. Learning File
- `learning/PHASE_0_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: Why do we separate `client/` and `server/` into two distinct folders?
- Q2: What is the main role of an ODM like Mongoose?
- Q3: What is the difference between a GET request and a POST request?
- Q4: Why do we store sensitive configurations in `.env` files?
- Q5: What is the purpose of `.gitignore`?

#### 15. Definition of Done
- [x] Project scope documented in `docs/PROJECT_REQUIREMENTS.md`.
- [x] System diagram completed in `docs/SYSTEM_ARCHITECTURE.md`.
- [x] `learning/PHASE_0_LEARNING.txt` created.

---

### PHASE 1 — Environment Setup & MERN Fundamentals

#### 1. Objective
Set up Node.js, Express, React (Vite), MongoDB connection, and establish live frontend-to-backend `/api/health` communication.

#### 2. MERN Concepts to Learn
- Node.js runtime & `npm` package manager.
- Express web server setup & routing basics.
- React components, Vite bundler, and JSX.
- MongoDB connection using Mongoose.
- CORS (Cross-Origin Resource Sharing) fundamentals.

#### 3. Colabz Features Implemented
- Project starter setup, backend server bootstrap, `/api/health` system check, live React status widget.

#### 4. Technologies Used
- Node.js, Express, React, Vite, Mongoose, Axios, CORS, Dotenv.

#### 5. Backend Work
- `server/server.js`: Express server setup.
- `server/config/db.js`: Mongoose MongoDB connection.
- `server/routes/health.js`: `/api/health` route.

#### 6. Frontend Work
- `client/src/App.jsx`: Live system status component fetching API data.
- `client/src/index.css`: Design system CSS setup.

#### 7. Database Work
- MongoDB connection string setup (`mongodb://127.0.0.1:27017/colabz`).

#### 8. APIs
- `GET /api/health`

#### 9. Socket/WebRTC
- None (Introduced in later phases).

#### 10. Files/Folders
- `server/server.js`, `server/config/db.js`, `server/routes/health.js`, `client/src/App.jsx`, `client/src/index.css`.

#### 11. Testing
- Tested using HTTP request to `/api/health` verifying status `200 OK` and MongoDB connected.

#### 12. Git/GitHub
- Commit: `feat: setup MERN project foundation and health API`.

#### 13. Learning File
- `learning/PHASE_1_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: What port does Vite default to?
- Q2: What is CORS and why is it needed when React calls Express?
- Q3: How does Mongoose connect Node.js to MongoDB?
- Q4: What information does `package.json` hold?
- Q5: How do environment variables in `.env` protect application settings?

#### 15. Definition of Done
- [x] Backend running on port 5000.
- [x] React running on port 5173 fetching `/api/health`.
- [x] MongoDB connection established.
- [x] `learning/PHASE_1_LEARNING.txt` written.

---

### PHASE 2 — React Fundamentals & Core UI Layout

#### 1. Objective
Master React components, state, props, React Router navigation, and construct Colabz's responsive application shell & landing pages.

#### 2. MERN Concepts to Learn
- JSX, React Components, Props, `useState`, `useEffect`.
- Client-side routing with `react-router-dom` (`Routes`, `Route`, `Link`, `useNavigate`).
- Layout components & CSS grid/flexbox for dashboard structures.

#### 3. Colabz Features Implemented
- Header Navigation, Sidebar, Landing Page, Login Page UI layout, Register Page UI layout, Base Dashboard layout.

#### 4. Technologies Used
- React, React Router DOM, Lucide Icons, Vanilla CSS.

#### 5. Backend Work
- Serve static assets or fallback routes if needed.

#### 6. Frontend Work
- `client/src/layouts/MainLayout.jsx`
- `client/src/pages/LandingPage.jsx`
- `client/src/pages/LoginPage.jsx`
- `client/src/pages/RegisterPage.jsx`
- `client/src/pages/DashboardPage.jsx`

#### 7. Database Work
- None.

#### 8. APIs
- UI forms built ready for API connection in Phase 6.

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `client/src/layouts/`, `client/src/pages/`, `client/src/components/Navbar.jsx`, `client/src/components/Sidebar.jsx`.

#### 11. Testing
- Verify route navigation between `/`, `/login`, `/register`, and `/dashboard` without page reloads.

#### 12. Git/GitHub
- Commit: `feat: add react router navigation and core UI layout shell`.

#### 13. Learning File
- `learning/PHASE_2_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: What is Single Page Application (SPA) routing?
- Q2: Difference between `useState` and regular JS variables?
- Q3: What is the purpose of `useEffect` with an empty dependency array `[]`?
- Q4: How do props allow parent components to pass data to child components?
- Q5: Why do we use `<Link>` instead of `<a href>` in React Router?

#### 15. Definition of Done
- [ ] Router configured cleanly.
- [ ] Landing page, Login page, and Register UI pages rendered.
- [ ] Navigation shell responsive across screen sizes.
- [ ] `learning/PHASE_2_LEARNING.txt` created.

---

### PHASE 3 — Backend Fundamentals & REST API Architecture

#### 1. Objective
Understand Express controllers, custom middleware, request validation, error handling, and build structured API skeletons.

#### 2. MERN Concepts to Learn
- Express request-response lifecycle (`req`, `res`, `next`).
- Modular route architecture (`express.Router()`).
- Controller pattern for separating business logic from route definitions.
- Custom middleware for logging and global error handling.

#### 3. Colabz Features Implemented
- Standardized API response wrappers (`{ success, data, message, error }`), centralized error handler middleware.

#### 4. Technologies Used
- Node.js, Express.js.

#### 5. Backend Work
- `server/middleware/errorHandler.js`
- `server/middleware/logger.js`
- `server/controllers/` skeleton controllers.
- `server/routes/` modular routes.

#### 6. Frontend Work
- Centralized Axios client setup (`client/src/services/api.js`).

#### 7. Database Work
- None.

#### 8. APIs
- Stubbed REST routes for `/api/users`, `/api/projects`.

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `server/middleware/`, `server/controllers/`, `server/routes/`, `client/src/services/api.js`.

#### 11. Testing
- Test stubbed API endpoints using Postman or curl returning JSON error handling structures.

#### 12. Git/GitHub
- Commit: `feat: implement backend controller pattern and error middleware`.

#### 13. Learning File
- `learning/PHASE_3_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: What is the role of `next()` in Express middleware?
- Q2: Why should route handlers delegate logic to controller functions?
- Q3: What are the standard HTTP status codes: 200, 201, 400, 401, 403, 404, 500?
- Q4: How does centralized error handling prevent server crashes?
- Q5: Why is Axios preferred over basic `fetch()`?

#### 15. Definition of Done
- [ ] Centralized error handler active.
- [ ] Route-controller structure established.
- [ ] `learning/PHASE_3_LEARNING.txt` created.

---

### PHASE 4 — MongoDB, Mongoose Schemas & Data Modeling

#### 1. Objective
Master MongoDB collections, Mongoose schema creation, data types, validation rules, methods, and relationship modeling (References vs Embedding).

#### 2. MERN Concepts to Learn
- NoSQL document structure & Collections.
- Mongoose Schemas, Models, Field Validations (`required`, `unique`, `enum`, `default`).
- ObjectIds, `ref` relationships, and Mongoose `.populate()`.
- Timestamps option (`createdAt`, `updatedAt`).

#### 3. Colabz Features Implemented
- User Schema, Project Schema, ProjectMember Schema, Task Schema, Issue Schema data models.

#### 4. Technologies Used
- MongoDB, Mongoose.

#### 5. Backend Work
- `server/models/User.js`
- `server/models/Project.js`
- `server/models/ProjectMember.js`
- `server/models/Task.js`
- `server/models/Issue.js`

#### 6. Frontend Work
- None.

#### 7. Database Work
- Define all Mongoose schemas and relationships. Create index specifications.
- `docs/DATABASE_DESIGN.md` documentation.

#### 8. APIs
- Database seed script (`server/utils/seedDB.js`) to test model creation.

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `server/models/`, `docs/DATABASE_DESIGN.md`, `server/utils/seedDB.js`.

#### 11. Testing
- Run seed script to insert sample data and verify Mongoose population queries output correct references.

#### 12. Git/GitHub
- Commit: `feat: define Mongoose models and database architecture`.

#### 13. Learning File
- `learning/PHASE_4_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: What is an `ObjectId` in MongoDB?
- Q2: Difference between referencing documents and embedding documents?
- Q3: How does Mongoose `.populate()` work under the hood?
- Q4: What is an index in MongoDB and why is it important for search performance?
- Q5: What happens when a Mongoose validation rule fails?

#### 15. Definition of Done
- [ ] All core Mongoose models created.
- [ ] `docs/DATABASE_DESIGN.md` completed.
- [ ] Seed script runs cleanly.
- [ ] `learning/PHASE_4_LEARNING.txt` created.

---

### PHASE 5 — Full-Stack Integration & API Connection

#### 1. Objective
Connect React frontend components with Express REST APIs, handle async loading/error states, and generate interactive API documentation.

#### 2. MERN Concepts to Learn
- Promises, Async/Await in JavaScript.
- Handling API states in React (`loading`, `data`, `error`).
- Passing data through props and displaying state lists.
- API documentation standards.

#### 3. Colabz Features Implemented
- Dynamic API data rendering on Frontend dashboard, reusable API service modules, API documentation setup.

#### 4. Technologies Used
- React, Express, Axios, Mongoose.

#### 5. Backend Work
- Finalize GET endpoints for testing integration.

#### 6. Frontend Work
- Connect `DashboardPage.jsx` to fetch backend statistics.
- Create UI feedback components (`LoadingSpinner.jsx`, `ErrorMessage.jsx`).

#### 7. Database Work
- Query execution optimization.

#### 8. APIs
- `docs/API_DOCUMENTATION.md` initialization.

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `client/src/components/LoadingSpinner.jsx`, `docs/API_DOCUMENTATION.md`.

#### 11. Testing
- Test dynamic list rendering and error alert displays when backend is intentionally stopped.

#### 12. Git/GitHub
- Commit: `feat: integrate frontend api services and loading states`.

#### 13. Learning File
- `learning/PHASE_1_LEARNING.txt` update / `learning/PHASE_5_LEARNING.txt`.

#### 14. Beginner Checkpoint
- Q1: Why should frontend apps handle loading states during API calls?
- Q2: What is the purpose of Axios interceptors?
- Q3: How do you catch errors gracefully in an `async/await` function?
- Q4: What is the standard structure of a REST API endpoint URL?
- Q5: Why is returning consistent JSON formatting crucial for APIs?

#### 15. Definition of Done
- [ ] React dynamically fetches and renders backend data.
- [ ] API documentation started in `docs/API_DOCUMENTATION.md`.
- [ ] `learning/PHASE_5_LEARNING.txt` created.

---

### PHASE 6 — Authentication & Authorization (JWT + bcrypt)

#### 1. Objective
Implement secure user registration, password hashing, JSON Web Token (JWT) issuance, protected Express middleware, and React AuthContext persistence.

#### 2. MERN Concepts to Learn
- Authentication vs Authorization.
- Password security & salt hashing with `bcryptjs`.
- Stateless authentication with JSON Web Tokens (JWT header, payload, signature).
- React Context API (`createContext`, `useContext`, `AuthContext`).
- Protected Routes in React Router (`<ProtectedRoute>`).

#### 3. Colabz Features Implemented
- User Register, Login, Logout, Current User (`/api/auth/me`), Token persistence in `localStorage`, Protected Dashboard pages.

#### 4. Technologies Used
- JWT (`jsonwebtoken`), `bcryptjs`, React Context API.

#### 5. Backend Work
- `server/controllers/authController.js`
- `server/routes/authRoutes.js`
- `server/middleware/authMiddleware.js` (JWT token verification).

#### 6. Frontend Work
- `client/src/context/AuthContext.jsx`
- `client/src/components/ProtectedRoute.jsx`
- Connect `RegisterPage.jsx` and `LoginPage.jsx` to auth APIs.

#### 7. Database Work
- `User` model pre-save hook for password hashing.

#### 8. APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `server/middleware/authMiddleware.js`, `client/src/context/AuthContext.jsx`, `docs/AUTHENTICATION_FLOW.md`.

#### 11. Testing
- Register new user, test invalid login credentials error, verify token storage in browser, attempt visiting `/dashboard` without login (should redirect to `/login`).

#### 12. Git/GitHub
- Commit: `feat: implement jwt authentication and protected routes`.

#### 13. Learning File
- `learning/PHASE_6_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: Why must plain-text passwords NEVER be saved in the database?
- Q2: What are the three parts of a JWT token?
- Q3: Where is the JWT sent in HTTP requests for protected routes?
- Q4: What does `AuthContext` do in React?
- Q5: How does a backend middleware verify if a request is authenticated?

#### 15. Definition of Done
- [ ] Password hashing verified in MongoDB.
- [ ] JWT issued upon valid login.
- [ ] Protected routes block unauthorized users.
- [ ] `learning/PHASE_6_LEARNING.txt` created.

---

### PHASE 7 — User Profiles & Profile Settings

#### 1. Objective
Enable users to view public developer profiles, update personal information, bio, skills, social links, and upload custom profile pictures via Multer.

#### 2. MERN Concepts to Learn
- File handling in Express with `multer`.
- Static folder serving in Express (`express.static`).
- Handling array fields (Skills tags) in Mongoose and React forms.
- Updating nested user profile documents.

#### 3. Colabz Features Implemented
- Public Profile page (`/profile/:username`), Edit Profile Modal/Page, Avatar file upload, Tech Skills tag manager.

#### 4. Technologies Used
- Multer, React Form handling, Express Static.

#### 5. Backend Work
- `server/middleware/uploadMiddleware.js` (Multer setup).
- `server/controllers/userController.js`
- `server/routes/userRoutes.js`

#### 6. Frontend Work
- `client/src/pages/ProfilePage.jsx`
- `client/src/pages/EditProfilePage.jsx`
- `client/src/components/AvatarUpload.jsx`

#### 7. Database Work
- Update `User` schema with skills, bio, avatar, and social link fields.

#### 8. APIs
- `GET /api/users/profile/:username`
- `PUT /api/users/profile`
- `POST /api/users/avatar`

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `server/uploads/`, `server/middleware/uploadMiddleware.js`, `client/src/pages/ProfilePage.jsx`.

#### 11. Testing
- Upload image file as avatar, edit bio/skills, confirm updated image displays across header and public profile.

#### 12. Git/GitHub
- Commit: `feat: add user profiles and avatar file upload support`.

#### 13. Learning File
- `learning/PHASE_7_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: How does Multer process `multipart/form-data` requests?
- Q2: How do you serve user-uploaded images statically in Express?
- Q3: Why should file size limits and file type checks be enforced on uploads?
- Q4: How do you handle multi-select or array tag inputs in React state?
- Q5: What is the difference between URL path params (`:username`) and query params (`?search=foo`)?

#### 15. Definition of Done
- [ ] User profile page renders dynamic data.
- [ ] Avatar upload saves file to disk and updates user avatar URL.
- [ ] `learning/PHASE_7_LEARNING.txt` created.

---

### PHASE 8 — Project / Repository System (Core Feature)

#### 1. Objective
Build the main repository management core of Colabz allowing users to create, view, edit, and delete projects with public/private visibility and custom tags.

#### 2. MERN Concepts to Learn
- Complex CRUD operations in Mongoose.
- Text search indexing and filtering.
- Dynamic route parameters in React Router (`/projects/:projectId`).
- Tabbed Navigation UI state management.

#### 3. Colabz Features Implemented
- Create Project modal/page, User Projects list view, Public/Private repository toggle, Project Overview tab, Project README view.

#### 4. Technologies Used
- Express, Mongoose, React, Lucide Icons.

#### 5. Backend Work
- `server/controllers/projectController.js`
- `server/routes/projectRoutes.js`

#### 6. Frontend Work
- `client/src/pages/CreateProjectPage.jsx`
- `client/src/pages/ProjectDetailsPage.jsx`
- `client/src/components/ProjectCard.jsx`
- `client/src/components/ProjectHeader.jsx`

#### 7. Database Work
- `Project` schema creation with references to Owner and Array of Tags.

#### 8. APIs
- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `server/controllers/projectController.js`, `client/src/pages/ProjectDetailsPage.jsx`.

#### 11. Testing
- Create a new project, verify project displays under "My Projects", check that private projects are hidden from non-members.

#### 12. Git/GitHub
- Commit: `feat: implement project repository creation and dashboard overview`.

#### 13. Learning File
- `learning/PHASE_8_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: How do public vs private project visibility checks work in database queries?
- Q2: How do you handle nested routing or tab switching in React?
- Q3: Why do we store project creator as a reference (`owner: userId`)?
- Q4: How do you confirm deletion with a modal before sending a DELETE API call?
- Q5: How do tag arrays help in filtering repositories?

#### 15. Definition of Done
- [ ] Create project form succeeds and saves to database.
- [ ] Project dashboard overview tab renders project info.
- [ ] `learning/PHASE_8_LEARNING.txt` created.

---

### PHASE 9 — Project Collaboration & Role-Based Access Control (RBAC)

#### 1. Objective
Implement member invitations, role management (`OWNER`, `ADMIN`, `MEMBER`, `VIEWER`), and enforce permission checks across backend APIs and frontend buttons.

#### 2. MERN Concepts to Learn
- Role-Based Access Control (RBAC) architecture.
- Junction collections in MongoDB for Many-to-Many relationships (`ProjectMember`).
- Granular permission check middleware in Express.

#### 3. Colabz Features Implemented
- Project Members tab, Invite user by email/username modal, Change member role dropdown, Remove member confirmation, RBAC permission enforcement.

#### 4. Technologies Used
- Mongoose compound indexes, Express RBAC middleware.

#### 5. Backend Work
- `server/models/ProjectMember.js`
- `server/middleware/rbacMiddleware.js` (`checkProjectRole(['OWNER', 'ADMIN'])`)
- `server/controllers/memberController.js`

#### 6. Frontend Work
- `client/src/components/ProjectMembersTab.jsx`
- `client/src/components/InviteMemberModal.jsx`

#### 7. Database Work
- `ProjectMember` schema with unique index on `{ project: 1, user: 1 }`.

#### 8. APIs
- `GET /api/projects/:id/members`
- `POST /api/projects/:id/members`
- `PUT /api/projects/:id/members/:userId`
- `DELETE /api/projects/:id/members/:userId`

#### 9. Socket/WebRTC
- Real-time notification trigger on member invite (prepared for Phase 12).

#### 10. Files/Folders
- `server/middleware/rbacMiddleware.js`, `client/src/components/ProjectMembersTab.jsx`.

#### 11. Testing
- Login as OWNER, invite a second user as MEMBER. Log in as MEMBER and verify project settings edit button is disabled/hidden and protected backend route returns `403 Forbidden`.

#### 12. Git/GitHub
- Commit: `feat: implement project member invitation and rbac permissions`.

#### 13. Learning File
- `learning/PHASE_9_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: What is the difference between Authentication and Authorization?
- Q2: Why is a junction collection (`ProjectMember`) better than an array inside `Project`?
- Q3: What HTTP status code is returned when a user lacks permission (403 vs 401)?
- Q4: How does a compound unique index prevent duplicate member invitations?
- Q5: How do frontend conditional renders complement backend RBAC checks?

#### 15. Definition of Done
- [ ] Member invitation flow working.
- [ ] Roles enforced (`OWNER`, `ADMIN`, `MEMBER`, `VIEWER`).
- [ ] `403 Forbidden` correctly returned for unauthorized actions.
- [ ] `learning/PHASE_9_LEARNING.txt` created.

---

### PHASE 10 — Task Management (Kanban) & GitHub-style Issues

#### 1. Objective
Build the project productivity system featuring a 4-column Kanban board for task management, and a complete GitHub-style Issue tracking system with labels and comment threads.

#### 2. MERN Concepts to Learn
- Complex state updates (drag-and-drop or state transitions).
- Complex query parameters for filtering (`?status=open&label=bug`).
- Auto-incrementing field logic per project scope (e.g. Issue `#1`, `#2`).
- Nested comment models and population.

#### 3. Colabz Features Implemented
- Kanban Task Board (`TODO`, `IN_PROGRESS`, `IN_REVIEW`, `COMPLETED`), Task Creation Modal, Issue Tracker list, Issue Creation form, Issue Labels, Issue Assignee, Issue Close/Reopen, Comment thread on issues.

#### 4. Technologies Used
- Express, Mongoose, React State, Flexbox/Grid layout.

#### 5. Backend Work
- `server/models/Task.js`
- `server/models/Issue.js`
- `server/models/IssueComment.js`
- `server/controllers/taskController.js`
- `server/controllers/issueController.js`

#### 6. Frontend Work
- `client/src/components/KanbanBoard.jsx`
- `client/src/components/TaskCard.jsx`
- `client/src/components/IssueList.jsx`
- `client/src/components/IssueDetailModal.jsx`

#### 7. Database Work
- Task and Issue collection indexing on `project` and `status`.

#### 8. APIs
- `GET /api/projects/:id/tasks`, `POST /api/projects/:id/tasks`, `PUT /api/tasks/:id`, `DELETE /api/tasks/:id`
- `GET /api/projects/:id/issues`, `POST /api/projects/:id/issues`, `PUT /api/issues/:id`, `POST /api/issues/:id/comments`

#### 9. Socket/WebRTC
- Real-time activity log broadcast trigger on task/issue creation.

#### 10. Files/Folders
- `server/controllers/taskController.js`, `server/controllers/issueController.js`, `client/src/components/KanbanBoard.jsx`, `client/src/components/IssueList.jsx`.

#### 11. Testing
- Create a task, change status from `TODO` to `COMPLETED`. Create issue `#1`, post a comment, close issue, verify issue badge updates to `CLOSED`.

#### 12. Git/GitHub
- Commit: `feat: implement kanban task board and issue tracker with comments`.

#### 13. Learning File
- `learning/PHASE_10_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: How does query parameter filtering (`req.query`) work in Express?
- Q2: How do you implement auto-incrementing numbers per project in MongoDB?
- Q3: What is the optimal state structure for managing 4 Kanban columns in React?
- Q4: Why are comment collections referenced to an Issue ID?
- Q5: How do status enum values prevent invalid database writes?

#### 15. Definition of Done
- [ ] Kanban board columns display tasks accurately by status.
- [ ] Issue tracker creates issues, tags labels, and receives comments.
- [ ] `learning/PHASE_10_LEARNING.txt` created.

---

### PHASE 11 — Repository File Browser & Virtual File Management

#### 1. Objective
Create a simplified project repository file browser experience, allowing users to upload, view, download, and delete files/folders and display rendered markdown `README.md`.

#### 2. MERN Concepts to Learn
- Tree structure representation in JSON/MongoDB.
- Multi-file uploads via Multer.
- Stream responses for file downloads.
- Rendered Markdown viewing in React.

#### 3. Colabz Features Implemented
- Repository File Explorer tab, Folder creation, File upload modal, Markdown README viewer, File download helper.

#### 4. Technologies Used
- Multer, React Markdown renderer (`react-markdown` / vanilla markdown parser).

#### 5. Backend Work
- `server/models/File.js`
- `server/controllers/fileController.js`

#### 6. Frontend Work
- `client/src/components/FileExplorerTab.jsx`
- `client/src/components/ReadmeViewer.jsx`

#### 7. Database Work
- `File` model storing file metadata, path, size, parent folder, and project ID.

#### 8. APIs
- `GET /api/projects/:id/files`
- `POST /api/projects/:id/files/upload`
- `DELETE /api/files/:fileId`

#### 9. Socket/WebRTC
- None.

#### 10. Files/Folders
- `server/controllers/fileController.js`, `client/src/components/FileExplorerTab.jsx`.

#### 11. Testing
- Upload a sample `README.md`, view rendered markdown output in project Overview tab, download file and confirm integrity.

#### 12. Git/GitHub
- Commit: `feat: implement virtual file explorer and markdown readme renderer`.

#### 13. Learning File
- `learning/PHASE_11_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: How does a virtual file system differ from an actual Git version control engine?
- Q2: How do you model parent-child folder structures in MongoDB?
- Q3: What HTTP headers are set when serving a file download (`Content-Disposition`)?
- Q4: How do you sanitize markdown content to prevent XSS attacks?
- Q5: Why store file metadata in MongoDB while keeping actual binary files on disk/storage?

#### 15. Definition of Done
- [ ] Files upload and display in folder structure.
- [ ] `README.md` renders seamlessly on project overview.
- [ ] `learning/PHASE_11_LEARNING.txt` created.

---

### PHASE 12 — Socket.IO Real-Time Chat & Direct Messaging

#### 1. Objective
Understand WebSockets, install Socket.IO, design room architecture, and build real-time project room chat, 1-on-1 direct messaging, online presence indicators, and typing feedback.

#### 2. MERN Concepts to Learn
- WebSockets vs HTTP Polling.
- Socket.IO connection lifecycle (`connect`, `disconnect`, `reconnect`).
- Socket Rooms (`socket.join`, `socket.to().emit`).
- Real-time state synchronization in React (`SocketContext`).
- Unread message counting & presence management.

#### 3. Colabz Features Implemented
- Real-Time Project Room Chat, 1-on-1 Direct Messaging drawer, Online/Offline green presence dots, "User is typing..." indicator, Unread message badge.

#### 4. Technologies Used
- `socket.io` (Server), `socket.io-client` (Client), React Context API (`SocketContext.jsx`).

#### 5. Backend Work
- `server/sockets/socketHandler.js` (Socket event router).
- `server/controllers/chatController.js`
- `server/models/Conversation.js`, `server/models/Message.js`

#### 6. Frontend Work
- `client/src/context/SocketContext.jsx`
- `client/src/components/ProjectChatTab.jsx`
- `client/src/components/DirectMessageDrawer.jsx`
- `client/src/components/TypingIndicator.jsx`

#### 7. Database Work
- `Conversation` & `Message` schemas with indexing on `conversation` and `createdAt`.

#### 8. APIs
- `GET /api/conversations`
- `GET /api/conversations/:id/messages`

#### 9. Socket/WebRTC
- Implement events: `setup`, `join_project`, `send_message`, `receive_message`, `typing`, `stop_typing`.
- `docs/SOCKET_ARCHITECTURE.md` documentation.

#### 10. Files/Folders
- `server/sockets/socketHandler.js`, `client/src/context/SocketContext.jsx`, `docs/SOCKET_ARCHITECTURE.md`.

#### 11. Testing
- Open two different browsers logged into User A and User B. Send message from User A in project chat, verify message instantly pops up on User B's screen without page refresh. Verify typing indicator appears when typing.

#### 12. Git/GitHub
- Commit: `feat: implement real-time chat direct messaging and typing indicators via socket.io`.

#### 13. Learning File
- `learning/PHASE_12_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: What is the main difference between HTTP request-response and WebSocket full-duplex communication?
- Q2: What is a Socket.IO Room and how does `io.to(room).emit()` work?
- Q3: Why should socket connections be wrapped inside a React Context provider?
- Q4: How do you prevent duplicate socket listener bindings when components re-render?
- Q5: Where does REST API end and Socket.IO begin in real-time chat design?

#### 15. Definition of Done
- [ ] Socket.IO server connected to Express server on Port 5000.
- [ ] Instant message delivery working in project room and 1-on-1 chat.
- [ ] Typing indicators and online status functional.
- [ ] `docs/SOCKET_ARCHITECTURE.md` and `learning/PHASE_12_LEARNING.txt` created.

---

### PHASE 13 — Notifications, Activity Timeline & Global Search

#### 1. Objective
Build an automated real-time notification engine, project activity audit timeline, and global instant search across Users, Projects, and Repositories.

#### 2. MERN Concepts to Learn
- MongoDB `$or`, `$regex`, and text index queries for search.
- Event-driven notifications via Socket.IO.
- Pagination / infinite scrolling basics in Mongoose (`limit`, `skip`).

#### 3. Colabz Features Implemented
- Global Search bar with live autocomplete dropdown, Notification drawer with unread count badge, Project Activity feed timeline.

#### 4. Technologies Used
- Express, MongoDB Regex & Text Index, Socket.IO, Lucide Icons.

#### 5. Backend Work
- `server/controllers/notificationController.js`
- `server/controllers/activityController.js`
- `server/controllers/searchController.js`

#### 6. Frontend Work
- `client/src/components/NotificationDrawer.jsx`
- `client/src/components/ActivityTimeline.jsx`
- `client/src/components/GlobalSearchBar.jsx`

#### 7. Database Work
- `Notification` & `Activity` schemas with indexing on `recipient` / `project`.

#### 8. APIs
- `GET /api/notifications`, `PUT /api/notifications/read`
- `GET /api/projects/:id/activity`
- `GET /api/search?q=query`

#### 9. Socket/WebRTC
- `new_notification` real-time push event to `user:<userId>` room.

#### 10. Files/Folders
- `server/controllers/searchController.js`, `client/src/components/GlobalSearchBar.jsx`.

#### 11. Testing
- Search for "React" or user username, verify matching results display instantly. Trigger task assignment and verify assignee receives instant bell notification badge increment.

#### 12. Git/GitHub
- Commit: `feat: implement global search real-time notifications and activity feed`.

#### 13. Learning File
- `learning/PHASE_13_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: How does MongoDB `$regex` perform case-insensitive pattern matching?
- Q2: Why is storing notifications in MongoDB necessary if we already send real-time socket events?
- Q3: How do activity feeds create audit trails for team actions?
- Q4: How do you debounce search input in React to prevent excessive API calls?
- Q5: How do unread notification counters update in real time?

#### 15. Definition of Done
- [ ] Global search returns matching users and projects.
- [ ] Notifications persist in database and push via sockets.
- [ ] Project activity tab logs events chronologically.
- [ ] `learning/PHASE_13_LEARNING.txt` created.

---

### PHASE 14 — WebRTC 1-on-1 Voice & Video Calling

#### 1. Objective
Understand peer-to-peer media communication, STUN servers, SDP offer/answer exchanges, and build 1-on-1 voice and video calling with mute/unmute and camera toggles.

#### 2. MERN Concepts to Learn
- Client-Server vs Peer-to-Peer (P2P) media streaming.
- WebRTC core APIs: `navigator.mediaDevices.getUserMedia()`, `RTCPeerConnection`.
- Signaling process: SDP Offers, SDP Answers, ICE Candidates.
- STUN (Session Traversal Utilities for NAT) server concept for public IP discovery.
- Managing media stream tracks (`audioTrack.enabled`, `videoTrack.enabled`).

#### 3. Colabz Features Implemented
- Start Voice Call button, Start Video Call button, Incoming Call modal overlay with Ringtone sound, Accept/Reject call controls, Active Call window with local preview & remote video stream, Mute/Unmute microphone toggle, Camera ON/OFF toggle, End Call button.

#### 4. Technologies Used
- WebRTC Native Browser API, Socket.IO for signaling, React `useRef` for media video elements.

#### 5. Backend Work
- Expand `server/sockets/socketHandler.js` to route call signaling events: `call_user`, `incoming_call`, `answer_call`, `call_accepted`, `ice_candidate`, `end_call`.

#### 6. Frontend Work
- `client/src/context/CallContext.jsx` (Global call state provider).
- `client/src/components/IncomingCallModal.jsx`
- `client/src/components/CallContainer.jsx`
- `client/src/components/VideoPlayer.jsx`

#### 7. Database Work
- Optional: `CallHistory` model if storing call duration logs.

#### 8. APIs
- None (Media streams flow directly P2P; signaling via WebSockets).

#### 9. Socket/WebRTC
- WebRTC Peer Connections + Socket.IO signaling events.
- `docs/WEBRTC_ARCHITECTURE.md` documentation.

#### 10. Files/Folders
- `client/src/context/CallContext.jsx`, `client/src/components/CallContainer.jsx`, `docs/WEBRTC_ARCHITECTURE.md`.

#### 11. Testing
- Open two browser windows with separate user accounts. User A clicks "Video Call" on User B. User B accepts incoming call modal. Verify local camera preview and remote video feed stream smoothly with clear audio, mic muting, and clean call termination.

#### 12. Git/GitHub
- Commit: `feat: implement webrtc 1-on-1 voice and video calling with socket signaling`.

#### 13. Learning File
- `learning/PHASE_14_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: Why does audio/video media NOT travel through the Node.js server in WebRTC?
- Q2: What is the purpose of a STUN server in WebRTC NAT traversal?
- Q3: What is SDP (Session Description Protocol) and what does it contain?
- Q4: What is an ICE candidate and why must peers exchange them during signaling?
- Q5: How do you attach a MediaStream object to a React `<video>` element?

#### 15. Definition of Done
- [ ] 1-on-1 Voice and Video calls connect between 2 users.
- [ ] Mute, camera toggle, and end call function correctly.
- [ ] `docs/WEBRTC_ARCHITECTURE.md` and `learning/PHASE_14_LEARNING.txt` created.

---

### PHASE 15 — UI/UX Refinement, Responsiveness & Security Hardening

#### 1. Objective
Refine application aesthetics with modern dark glassmorphism styling, ensure seamless mobile/desktop responsiveness, implement security best practices, and perform comprehensive system testing.

#### 2. MERN Concepts to Learn
- Production security: Express Rate Limiting, Helmet headers, Sanitization.
- Advanced CSS: Media queries, container queries, custom scrollbars, glassmorphism overlays.
- Frontend usability: Toast notifications, Skeleton loaders, Empty states.

#### 3. Colabz Features Implemented
- Sleek dark theme polish, Mobile responsive navbar & drawer navigation, Toast notifications system (`react-toastify` or custom toast), Empty state illustrations for tasks/issues, Rate limiting on Auth routes.

#### 4. Technologies Used
- Vanilla CSS, Express Rate Limit, Helmet, Toast UI components.

#### 5. Backend Work
- `server/middleware/rateLimiter.js`
- Integrate `helmet()` and security headers in `server/server.js`.

#### 6. Frontend Work
- Mobile menu toggles, custom responsive styling rules in `index.css`.
- Toast notification wrapper component (`Toast.jsx`).

#### 7. Database Work
- Final check of database index optimizations.

#### 8. APIs
- Validate rate limits and input sanitization middleware across all endpoints.

#### 9. Socket/WebRTC
- Socket disconnect cleanup and reconnect handlers.

#### 10. Files/Folders
- `server/middleware/rateLimiter.js`, `client/src/components/Toast.jsx`.

#### 11. Testing
- Test application layout across Mobile (375px), Tablet (768px), and Desktop (1440px) viewports. Perform rapid login attempts to verify rate limit blocks brute-force attempts.

#### 12. Git/GitHub
- Commit: `feat: add modern dark glassmorphism polish responsive layout and rate limiting`.

#### 13. Learning File
- `learning/PHASE_15_LEARNING.txt`

#### 14. Beginner Checkpoint
- Q1: What security threats does `helmet()` protect Express applications against?
- Q2: How does rate limiting prevent Denial of Service (DoS) and brute-force attacks?
- Q3: What are CSS media queries and why are mobile-first breakpoints recommended?
- Q4: Why are skeleton loaders preferred over spinner icons for layout loading?
- Q5: How do toast alerts enhance user feedback for background operations?

#### 15. Definition of Done
- [ ] Dark glassmorphic design consistent across all pages.
- [ ] Mobile responsive layout verified.
- [ ] Security rate limiters and headers active.
- [ ] `learning/PHASE_15_LEARNING.txt` created.

---

### PHASE 16 — Production Deployment, Documentation & Viva Preparation

#### 1. Objective
Deploy the frontend to Vercel/Render, backend to Render/Railway, database to MongoDB Atlas, finalize technical documentation, and prepare project presentation & viva answers.

#### 2. MERN Concepts to Learn
- Production build generation (`npm run build` in Vite).
- MongoDB Atlas cloud cluster creation and URI configuration.
- Production environment variable configuration (`NODE_ENV=production`).
- CORS origin lockdown to production frontend domain.
- Production WebSockets & STUN server considerations.

#### 3. Colabz Features Implemented
- Live deployed production URL, production MongoDB database cluster, complete `README.md` and Viva study guide.

#### 4. Technologies Used
- Vercel / Render / Railway, MongoDB Atlas, Git/GitHub.

#### 5. Backend Work
- Configure `server/server.js` for production deployment environment variables.

#### 6. Frontend Work
- Configure production base URL in `client/src/services/api.js`.

#### 7. Database Work
- Deploy schema and seed data to MongoDB Atlas cluster.

#### 8. APIs
- Test live HTTPS API endpoints.

#### 9. Socket/WebRTC
- Verify WSS (Secure WebSockets) connection on production server.

#### 10. Files/Folders
- `docs/DEPLOYMENT_GUIDE.md`
- `README.md` finalization.
- `learning/PHASE_16_LEARNING.txt`

#### 11. Testing
- Access live production app link, perform end-to-end user registration, project creation, chat message send, and video call test on live deployment.

#### 12. Git/GitHub
- Final Commit: `docs: finalize deployment guide readme and viva preparation documentation`. Push to main branch on GitHub.

#### 13. Learning File
- `learning/PHASE_16_LEARNING.txt`

#### 14. Beginner Checkpoint / Viva Questions
- Q1: Walk through the architectural flow of how a user message travels from React UI to another user's screen in Colabz.
- Q2: What is the difference between SQL and NoSQL databases, and why was MongoDB selected for Colabz?
- Q3: How does JWT authentication maintain stateless session verification?
- Q4: Explain the role of Socket.IO signaling in setting up a WebRTC peer connection.
- Q5: What step-by-step procedure was followed to deploy the backend and database to production cloud hosts?

#### 15. Definition of Done
- [ ] Live deployed application links working.
- [ ] MongoDB Atlas connected.
- [ ] `README.md`, `docs/DEPLOYMENT_GUIDE.md`, and `learning/PHASE_16_LEARNING.txt` completed.

---

## 10. DEPENDENCY MAP

```text
PHASE 0: Requirements & System Architecture
   ↓
PHASE 1: Environment Setup & Health Check API (COMPLETED)
   ↓
PHASE 2: React Fundamentals & Core Layout Shell
   ↓
PHASE 3: Backend Controllers & Error Middleware
   ↓
PHASE 4: MongoDB & Mongoose Schemas
   ↓
PHASE 5: Full-Stack Integration & API Connection
   ↓
PHASE 6: Authentication & Authorization (JWT + bcrypt)
   ↓
PHASE 7: User Profiles & Avatar Uploads
   ↓
PHASE 8: Project / Repository Management Core
   ↓
PHASE 9: Collaboration & RBAC Permissions
   ↓
PHASE 10: Task Kanban Board & Issue Tracker
   ↓
PHASE 11: Virtual File Browser & Markdown README
   ↓
PHASE 12: Socket.IO Real-Time Chat & Direct Messages
   ↓
PHASE 13: Notifications, Activity Feed & Global Search
   ↓
PHASE 14: WebRTC 1-on-1 Voice & Video Calling
   ↓
PHASE 15: UI/UX Refinement & Security Hardening
   ↓
PHASE 16: Cloud Deployment & Final Viva Prep
```

---

## 11. OVERALL TIMELINE

| Commitment Level | Estimated Time per Phase | Total Estimated Completion Time |
|---|---|---|
| **1 Hour / Day** | ~3 to 4 Days per Phase | ~8 to 10 Weeks |
| **2 Hours / Day** | ~1 to 2 Days per Phase | ~4 to 5 Weeks |
| **3 Hours / Day** | ~1 Day per Phase | ~2.5 to 3 Weeks |

*Note: As a beginner learning MERN from zero, quality concept comprehension and hands-on testing in each phase is far more important than rushing speed.*

---

## 12. FINAL DEFINITION OF DONE FOR COLABZ

- [x] **Phase 1 Complete**: Express backend, React Vite client, MongoDB connection, and `/api/health` live.
- [ ] **Full Authentication Flow**: Register, login, logout, password hashing, and JWT token persistence.
- [ ] **User Profiles**: Custom developer bio, skills tags, and avatar file uploads.
- [ ] **Repository System**: Create, view, edit, and delete public/private projects.
- [ ] **Collaboration & RBAC**: Invite members and enforce roles (`OWNER`, `ADMIN`, `MEMBER`, `VIEWER`).
- [ ] **Task & Issue Management**: 4-column Kanban board, GitHub-style issue creation, labels, and comments.
- [ ] **File Management**: Virtual repository browser and rendered Markdown `README.md`.
- [ ] **Real-Time Communication**: Project room chat, direct messages, online presence, and typing indicators via Socket.IO.
- [ ] **Voice & Video Calling**: Peer-to-peer 1-on-1 WebRTC audio/video call with mute and camera controls.
- [ ] **Notifications & Search**: Bell alert drawer, project activity audit timeline, and instant global search.
- [ ] **Documentation & Learning**: All 16 learning modules (`learning/PHASE_X_LEARNING.txt`) and technical architecture specs created under `docs/`.
- [ ] **Production Deployment**: Live frontend and backend cloud deployment connected to MongoDB Atlas.
