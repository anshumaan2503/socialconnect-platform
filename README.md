# SocialConnect

## Project Overview
SocialConnect is a full-stack social networking platform where users can share text and image updates, interact with posts through likes and comments, and perform real-time content searches. 

---

## Features
- **User Registration & Authentication**: Secure user registration and login with JWT-based session persistence.
- **Public Feed**: A chronologically ordered central feed displaying all user posts.
- **Text & Image Posts**: Support for text-only posts and posts containing images.
- **Media Uploads**: Direct image upload and hosting integrated with Cloudinary.
- **Likes & Comments**: Interactive capabilities enabling users to like/unlike posts and leave nested comments.
- **Real-Time Search**: Debounced client-side fuzzy search to filter posts by content or author username.
- **Docker Support**: Containerized local development setup for both client and API services.

---

## Architecture
SocialConnect uses a decoupled Client-Server architecture:

```text
       +---------------------------------------------+
       |             Client (React)                  |
       |  Handles rendering, routing, & local state  |
       +----------------------++----------------------+
                              || HTTP Requests / JWT
                              \/
       +---------------------------------------------+
       |        REST API (Node.js/Express)           |
       | Controller, middleware, & route controllers |
       +-----------++--------------------+-----------+
                    ||                    ||
                    || Mongoose Queries   || Image Files
                    \/                    \/
       +-----------------------+  +------------------+
       | MongoDB Atlas Cloud   |  |  Cloudinary CDN  |
       | User & Post Data      |  |  Image Storage   |
       +-----------------------+  +------------------+
```

---

## Tech Stack

### Frontend
- **Core**: React 19, JavaScript (ES6)
- **Build Tool**: Vite
- **Styling**: Material UI (MUI), Custom CSS
- **State Management**: Zustand
- **API Client**: Axios
- **Routing**: React Router DOM v7

### Backend
- **Runtime**: Node.js (LTS Alpine)
- **Framework**: Express.js
- **Database ODM**: Mongoose
- **File Upload**: Multer

### Database
- **Provider**: MongoDB Atlas

### Infrastructure
- **Containerization**: Docker, Docker Compose

### Deployment
- **Frontend**: Vercel
- **Backend**: Render

---

## Project Structure
```text
socialconnect/
├── backend/                  # Express REST API Server
│   ├── config/               # Database, Cloudinary, Env configurations
│   ├── controllers/          # Request handler functions
│   ├── middlewares/          # JWT check, error handler, rate limit, upload
│   ├── models/               # MongoDB Mongoose models (User, Post)
│   ├── routes/               # API endpoint routing declarations
│   ├── scripts/              # Database seeding utility
│   └── server.js             # Main server entrypoint
│
└── frontend/                 # React SPA Client (Vite)
    ├── src/                  # Client source code
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Page layouts (Feed, Login, Register)
    │   ├── services/         # Axios API connection layers
    │   └── store/            # Zustand global state stores
    ├── nginx.conf            # Production Nginx setup for Docker
    └── vite.config.js        # Vite compilation configuration
```

---

## Local Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Populate the `.env` variables with your MongoDB connection URI, JWT secret, and Cloudinary API credentials.
5. Seed the database with demo content:
   ```bash
   npm run seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   echo "VITE_API_URL=http://localhost:5000" > .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Docker Setup
SocialConnect can be run locally in containers using Docker Compose. 

1. Ensure the `backend/.env` file is populated with valid Cloudinary and MongoDB credentials.
2. Build and start the services:
   ```bash
   docker compose up --build -d
   ```
3. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

For detailed logs, teardown, and container commands, see [DOCKER_SETUP.md](./DOCKER_SETUP.md).

---

## Deployment
- **Frontend**: Deployed to **Vercel** with SPA routing support configuration in `vercel.json`.
- **Backend**: Deployed to **Render** as a Web Service.
- **Database**: Hosted on **MongoDB Atlas**.
- **Media**: Uploaded to and served from **Cloudinary**.

For full configuration guidelines, refer to [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## API Overview
Authentication headers require a Bearer token: `Authorization: Bearer <JWT_TOKEN>`.

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Verify user credentials and return a JWT

### Posts & Interactions
- `GET /api/posts` - Fetch posts chronologically (paginated)
- `POST /api/posts` - Create a post (accepts text and image uploads)
- `POST /api/posts/:id/like` - Toggle like status on a post
- `POST /api/posts/:id/comment` - Add a comment to a post

The full API contract details are documented in [FRONTEND_API_CONTRACT.md](./FRONTEND_API_CONTRACT.md).

---

## Demo Credentials
Use these pre-seeded credentials to test the application or log in during review:

- **Email**: `demo@socialconnect.com`
- **Password**: `Demo@123`

You can also use the registration form to create new accounts.
