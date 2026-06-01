# SocialConnect 🌐

## 📝 Project Overview
SocialConnect is a premium, glassmorphism-themed social network application designed to enable users to register, login, post text/image messages, run real-time debounced searches, comment, and like posts in a highly responsive, modern visual space.

---

## 🔗 Live Demo
* **Frontend Application:** `https://socialconnect-frontend.vercel.app` (Placeholder / Replace with your deployed URL)
* **Backend REST API:** `https://socialconnect-backend.onrender.com` (Placeholder / Replace with your deployed URL)

---

## 🔑 Demo Credentials
For testing and review purposes, you can log in directly using the pre-seeded account:
* **Email:** `demo@socialconnect.com`
* **Password:** `Demo@123`

You can also use the **Create Account (Register)** button to sign up with a new profile instantly.

---

## 🚀 Features

* **Glassmorphism Auth Experience:** High-fidelity, modern visual design for Login and Registration using custom primary blue tokens.
* **Instant Feed Updates:** A central hub showing community text and image posts ordered chronologically.
* **Cloud-based Image Uploads:** Seamless image uploads and hosting powered by the Cloudinary API.
* **Interactive Comments:** Leave thoughts and replies on posts with immediate comment counter increments.
* **Like / Unlike System:** Toggle likes on posts with visual updates and total count indexing.
* **Real-time Feed Search:** Fuzzy search posts by content text or author username as you type.
* **Comprehensive Error Handling:** Centralized API validation, rate limiting, and visual toast notifications.

---

## 🏗️ Architecture

SocialConnect is built using a decoupled Client-Server architecture:

```text
       +---------------------------------------------+
       |             Client (React/MUI)              |
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

### Frontend
* **Core:** React 19, Javascript (ES6+)
* **Build Tool:** Vite
* **Styling & UI Library:** Material UI (MUI), Vanilla CSS variables for Material Design tokens
* **State Management:** Zustand (lightweight, hook-based global state)
* **API Client:** Axios (with request/response interceptors for JWT)
* **Routing:** React Router DOM v7

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database ODM:** Mongoose
* **Image Processing:** Multer (multipart form-data helper)
* **Media Storage:** Cloudinary SDK

### Database & Security
* **Database:** MongoDB Atlas (Cloud NoSQL)
* **Encryption:** bcrypt (10 rounds password hashing)
* **Authorization:** JSON Web Token (JWT)
* **Protection:** Express Rate Limit & Helmet security headers

---

## 📁 Project Structure

The repository is structured into two main standalone applications (frontend and backend) to ensure separation of concerns:

```text
socialconnect/
├── backend/                  # Express REST API Server
│   ├── config/               # Database, Cloudinary, Env configurations
│   ├── controllers/          # Request handler functions
│   ├── middlewares/          # JWT check, error handler, rate limit, upload
│   ├── models/               # MongoDB Mongoose models (User, Post)
│   ├── routes/               # API endpoint routing declarations
│   ├── scripts/              # Database seeding utility
│   ├── utils/                # Standardized errors and async helpers
│   ├── server.js             # Main server entrypoint
│   └── package.json          # Node dependency manifest
│
├── frontend/                 # React SPA Client (Vite)
│   ├── public/               # Static assets
│   ├── src/                  # Client source code
│   │   ├── components/       # UI elements (auth, feed, etc.)
│   │   ├── hooks/            # Reusable React hooks
│   │   ├── pages/            # View routers (Feed, Login, Register)
│   │   ├── routes/           # Private/Public routing guards
│   │   ├── services/         # Axios API connection layers
│   │   ├── store/            # Zustand global state stores (auth, post)
│   │   ├── main.jsx          # Entrypoint script
│   │   └── App.jsx           # App layout container
│   ├── package.json          # Frontend dependency manifest
│   └── vite.config.js        # Vite compilation configuration
│
├── docker-compose.yml        # Main multi-container orchestrator
└── README.md                 # Primary project documentation
```

---

## 🛠️ Setup Instructions

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
4. Update the environment variables in `.env` (MongoDB connection URI, JWT secret, and Cloudinary keys).
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
   cd ../frontend
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

## 🚀 Deployment Instructions

### Database (MongoDB Atlas)
1. Set up a free Shared Cluster on MongoDB Atlas.
2. Under **Network Access**, add IP `0.0.0.0/0` (or configure your hosting provider's IP range).
3. Create a database user and generate a connection URI.

### Backend (Render / Heroku)
1. Link your GitHub repository to your Web Service.
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add all backend environment variables (`MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, etc.) under the environment section.

### Frontend (Vercel / Netlify)
1. Link your repository and create a new project.
2. Select the `/frontend` subfolder as root directory.
3. Configure `VITE_API_URL` pointing to your deployed backend.
4. Deploy!

---

## 🐳 Docker Deployment

SocialConnect is fully containerized. You can run both the frontend and backend in isolated containers using Docker Compose.

### Environment Setup
Ensure your local `backend/.env` file is populated with valid Cloudinary and MongoDB credentials.

### Build and Run
1. Build the images:
   ```bash
   docker compose build
   ```
2. Run the application:
   ```bash
   docker compose up -d
   ```
3. Access the application:
   - Frontend is available at `http://localhost:5173`
   - Backend API is available at `http://localhost:5000`

For detailed docker logs, stopping containers, or troubleshooting, please refer to the [DOCKER_SETUP.md](./DOCKER_SETUP.md) guide.

---

## 📸 Screenshots

*(Add screenshots of your deployed user interface here)*
* **Login Form:** Glassmorphism card with custom branding.
* **Social Feed:** Active feed showing text and image posts with interactive metrics.
* **Upload Modal:** File selection utility with preview rendering.

---

## 🔌 API Overview

All request and response bodies utilize standard JSON representation. Auth routes require no headers, while feed/post routes require a Bearer token: `Authorization: Bearer <JWT_TOKEN>`.

### Authentication
* `POST /api/auth/register` - Create a new account.
* `POST /api/auth/login` - Verify credentials and return a token.

### Posts & Interactions
* `GET /api/posts` - Fetch posts chronologically (supports pagination).
* `POST /api/posts` - Create a new post (handles text and image uploads via Multer).
* `POST /api/posts/:id/like` - Toggle like status on a post.
* `POST /api/posts/:id/comment` - Add a text comment to a post.
