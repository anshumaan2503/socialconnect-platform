# SocialConnect Platform

### Full-Stack Social Networking Application

* **Developer Name**: Anshuman Tiwari
* **Submission Year**: 2026

---

## 🚀 Project Overview

The **SocialConnect Platform** is a full-stack social media web application designed to facilitate real-time sharing of ideas, images, and user interactions. Built with a robust three-tier architecture, the project provides a clean, responsive layout coupled with secure API services. The application is fully containerized, simplifying deployment workflows and guaranteeing environment parity across local development and production hosting platforms.

---

## ✨ Key Features

| Feature | Category | Description |
| :--- | :--- | :--- |
| **User Registration** | Authentication | Create new user accounts with automated password hashing. |
| **JWT Authentication** | Security | Stateful user sessions managed securely via JSON Web Tokens. |
| **Public Feed** | Core | Main timeline showcasing chronological post feeds from all users. |
| **Text Posts** | Core | Create posts containing plain text and rich status descriptions. |
| **Image Posts** | Core | Upload image attachments which are processed and served securely. |
| **Likes** | Interaction | Interactive post liking system with dynamic count increments. |
| **Comments** | Interaction | Nested commenting system supporting user replies. |
| **Search** | Navigation | Text search capability matching posts by author or keywords. |
| **MongoDB Atlas** | Database | Multi-node cloud database setup for persistent data storage. |
| **Cloudinary Uploads** | Cloud Storage | Secure image upload handling and content delivery networks. |
| **Docker Support** | Infrastructure | Fully containerized environment with custom Dockerfiles. |
| **Responsive UI** | Design System | Fully optimized interface adapting across mobile and desktop devices. |

---

## ⚙️ Technology Stack

### Frontend
| Component | Details |
| :--- | :--- |
| **Library** | React (JavaScript) |
| **Build Tool** | Vite |
| **UI Framework** | Material UI (MUI) |
| **State Management**| Zustand |
| **Routing** | React Router DOM |
| **HTTP Client** | Axios |

### Backend
| Component | Details |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **ORM** | Mongoose (MongoDB) |
| **Security** | JWT (jsonwebtoken), bcryptjs, Helmet |
| **File Uploads** | Multer |
| **Validation** | Joi |

### Infrastructure & Deployment
| Component | Details |
| :--- | :--- |
| **Database** | MongoDB Atlas |
| **Media Host** | Cloudinary |
| **Containerization**| Docker / Docker Compose |
| **Web Server** | Nginx (Reverse Proxy) |
| **FE Hosting** | Vercel |
| **BE Hosting** | Render |

---

## 🏗️ Architecture Overview

```
User (Browser Client)
       ↓
React Frontend (Vercel)
       ↓
Express Backend (Render API)
  ├── MongoDB Atlas (Database Queries)
  └── Cloudinary (Image Assets Hosting)
```

---

## 🔗 Project Links

| Service | Target URL |
| :--- | :--- |
| **Frontend Application** | [https://socialconnect-platform.vercel.app](https://socialconnect-platform.vercel.app) |
| **GitHub Repository** | [https://github.com/anshumaan2503/socialconnect-platform](https://github.com/anshumaan2503/socialconnect-platform) |
| **Backend API URL** | [https://socialconnect-platform.onrender.com](https://socialconnect-platform.onrender.com) |
| **Health Check Endpoint**| [https://socialconnect-platform.onrender.com/api/health](https://socialconnect-platform.onrender.com/api/health) |

---

## 👤 Demo Account

> [!NOTE]
> Use these pre-configured credentials to bypass registration and explore the live feed directly:
> 
> * **Email**: `demo@socialconnect.com`
> * **Password**: `Demo@123`

---

## 📦 Deployment Status

- [x] **Frontend Deployed**: Hosted on Vercel with router redirects configured.
- [x] **Backend Deployed**: Containerized and hosted on Render Web Services.
- [x] **MongoDB Atlas Connected**: Database hosted in the cloud with access control whitelisted.
- [x] **Cloudinary Connected**: Image assets pipeline successfully uploading and rendering.
- [x] **Dockerized**: Backend and Frontend Dockerfiles verified and runnable via Docker Compose.

---

## 🧪 Reviewer Quick Start

Follow this 5-minute evaluation guide to test the core features of the platform:

1. **Login**: Access the frontend URL, enter the Demo credentials above, and submit.
2. **Create Post**: Compose a short message in the text field at the top of the feed page.
3. **Upload Image**: Click the *Photo/Video* option, attach an image file, and press *Post*.
4. **Search Posts**: Type a keyword (e.g., "Mountain" or "Hiking") in the search bar and verify filtering.
5. **Like & Comment**: Click the heart button on existing posts, type a reply, and check the comment timeline.

---

## 📁 Repository Structure

```
socialconnect-platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── Dockerfile
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── vercel.json
│   └── Dockerfile
├── DEPLOYMENT.md
├── DOCKER_SETUP.md
├── docker-compose.yml
├── FRONTEND_API_CONTRACT.md
├── PRD.md
├── PROJECT_SUBMISSION.md
└── README.md
```

---

## 🎯 Project Highlights

* **Full-Stack Development**: Implemented the Model-View-Controller (MVC) pattern, ensuring clean separation of concerns.
* **REST API Architecture**: Standardized HTTP endpoints with clear response status codes, centralized error middlewares, and robust Joi validations.
* **Secure Auth Pipeline**: Safe JWT auth flows with password hashing and express-rate-limit headers.
* **Cloud Integration**: Managed cloud persistence through MongoDB Atlas and high-performance media storage with Cloudinary.
* **Containerization**: Configured multi-stage Docker builds to optimize final image size.
* **Reliable Deployment**: Delivered zero-downtime client routing and persistent cross-origin setups.

---

*SocialConnect Platform | Developed by Anshuman Tiwari | 2026*
