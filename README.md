# 🌐 SocialConnect

A complete, decoupled full-stack social networking application designed for real-time interaction, post sharing, and media hosting. 

---

## 📝 Project Overview
**SocialConnect** is a web platform that enables users to connect and share updates. Built with a separate frontend client and backend REST API, it allows users to register accounts, share text and image updates, interact via likes and comments, and perform debounced, real-time searches across the feed.

---

## ✨ Features

- **🔐 Secure Authentication**: JWT-based session management, password hashing (bcrypt), and route guarding.
- **📰 Interactive Public Feed**: A chronological hub displaying text and image updates from the community.
- **🖼️ Media Integration**: Seamless image uploading and hosting powered directly by the Cloudinary API.
- **💬 Engagement Mechanics**: Double-interaction features allowing users to like/unlike posts and comment on updates.
- **🔍 Real-Time Search**: Debounced client-side fuzzy search to filter posts by content or author username instantly.
- **🐳 Dockerized Architecture**: Containerized setup utilizing Docker and Docker Compose for local development.

---

## 🏗️ Architecture

SocialConnect relies on a modern, decoupled client-server architecture:

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

## 💻 Tech Stack

### 🎨 Frontend
* **Core Framework**: React 19, JavaScript (ES6)
* **Build Utility**: Vite
* **UI & Styling**: Material UI (MUI), Custom CSS
* **State Management**: Zustand
* **API Communications**: Axios (with interceptors for auth headers)
* **Routing**: React Router DOM v7

### ⚙️ Backend
* **Runtime Environment**: Node.js (LTS Alpine)
* **API Framework**: Express.js
* **Database Driver**: Mongoose ODM
* **File Processing**: Multer

### 🗄️ Database
* **Cloud Database**: MongoDB Atlas

### 🛠️ Infrastructure & Deployment
* **Containerization**: Docker, Docker Compose
* **Frontend Hosting**: Vercel (supporting single-page app rewrite routing)
* **Backend Hosting**: Render
* **Asset CDN**: Cloudinary

---

## 📂 Project Structure
```text
socialconnect/
├── backend/                  # Express REST API Server
│   ├── config/               # Database, Cloudinary, Env configurations
│   ├── controllers/          # Request handler functions
│   ├── middlewares/          # JWT checks, rate limits, error mapping
│   ├── models/               # Mongoose schemas (User, Post)
│   ├── routes/               # API endpoint router mappings
│   ├── scripts/              # Database seeding utility (seed.js)
│   └── server.js             # API entrypoint script
│
└── frontend/                 # React SPA Client (Vite)
    ├── src/                  # Client source code
    │   ├── components/       # UI components (auth, feed, etc.)
    │   ├── pages/            # Page layouts (FeedPage, LoginPage, etc.)
    │   ├── services/         # Axios API connection layers
    │   └── store/            # Zustand global state stores
    ├── nginx.conf            # Custom Nginx configuration for production container
    └── vite.config.js        # Vite compiler configuration
```

---

## 🛠️ Local Setup

### ⚙️ Backend Installation
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Initialize configuration:
   ```bash
   cp .env.example .env
   ```
4. Configure `.env` with your MongoDB connection URI, JWT secret, and Cloudinary keys.
5. Populate the database with initial demo data:
   ```bash
   npm run seed
   ```
6. Start the API service:
   ```bash
   npm run dev
   ```

### 🖥️ Frontend Installation
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the client packages:
   ```bash
   npm install
   ```
3. Initialize the environment configuration:
   ```bash
   echo "VITE_API_URL=http://localhost:5000" > .env
   ```
4. Boot the client application:
   ```bash
   npm run dev
   ```

---

## 🐳 Docker Setup
SocialConnect can be run in fully isolated, local environments using Docker Compose.

1. Ensure the `backend/.env` file contains valid Cloudinary and MongoDB credentials.
2. Build and run the containers:
   ```bash
   docker compose up --build -d
   ```
3. Access the services:
   * **Frontend Client**: `http://localhost:5173`
   * **Backend API**: `http://localhost:5000`

For full details on logs, teardown, and troubleshooting, view [DOCKER_SETUP.md](./DOCKER_SETUP.md).

---

## 🚀 Deployment
- **Client Deployment**: Hosted on **Vercel** (with SPA routing configuration via `vercel.json`).
- **Server Deployment**: Hosted on **Render** as a Web Service.
- **Database**: Fully managed cluster on **MongoDB Atlas**.
- **Media CDN**: Managed directly through **Cloudinary**.

For comprehensive setup details and platform guidelines, view [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🔌 API Overview
All auth-secured requests require a Bearer token: `Authorization: Bearer <JWT_TOKEN>`.

### 🔑 Authentication Endpoints
* `POST /api/auth/register` - Registers a new user.
* `POST /api/auth/login` - Authenticates user credentials and returns a JWT.

### 📝 Posts & Actions Endpoints
* `GET /api/posts` - Retrieves posts chronologically (supports pagination).
* `POST /api/posts` - Publishes a new update (supports text and image uploads).
* `POST /api/posts/:id/like` - Toggles user like status on a specific post.
* `POST /api/posts/:id/comment` - Adds a comment to a specific post.

The complete frontend-backend API schemas are defined in [FRONTEND_API_CONTRACT.md](./FRONTEND_API_CONTRACT.md).

---

## 🔑 Demo Credentials
Use these pre-seeded credentials to quickly review and test the application:

* **Email Address**: `demo@socialconnect.com`
* **Password**: `Demo@123`

You can also use the registration form to create new accounts.
