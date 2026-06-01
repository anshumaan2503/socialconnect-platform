# SocialConnect Deployment Guide

This guide details the steps required to deploy the SocialConnect full-stack application to production.

---

## 1. Backend Deployment (Render)

We will deploy the Node.js/Express backend to **Render** as a **Web Service**.

### Environment Variables
Configure the following Environment Variables in the Render Dashboard under **Environment**:

| Variable | Description | Recommended Value / Source |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment Type | `production` |
| `PORT` | Backend Listening Port | `5000` (Render binds this dynamically, but configure for fallback) |
| `MONGODB_URI` | MongoDB Connection URI | MongoDB Atlas Connection String (see below) |
| `JWT_SECRET` | Authentication Secret | A long, cryptographically strong random string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Name | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary Secret | From Cloudinary Dashboard |

### Build & Start Commands
* **Build Command**: `npm install` (Runs package installation automatically)
* **Start Command**: `node server.js` (or `npm start` as defined in package.json)

---

## 2. Database Configuration (MongoDB Atlas)

1. Sign up for a free **MongoDB Atlas** account and create a shared cluster (M0).
2. Go to **Network Access** and add IP address `0.0.0.0/0` to allow connections from Render.
3. Go to **Database Access** and create a user with read/write access.
4. Retrieve your connection string (Node.js driver style):
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/socialconnect?retryWrites=true&w=majority`
5. Replace `<username>` and `<password>` with your database user credentials. Paste this connection string into the backend's `MONGODB_URI` environment variable.

---

## 3. Frontend Deployment (Vercel)

We will deploy the React (Vite) frontend to **Vercel**.

### Environment Variables
Configure the following Environment Variable in Vercel settings:

| Variable | Description | Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base API Endpoint | The deployed backend Render URL (e.g. `https://socialconnect-backend.onrender.com`) |

### Build Settings
Vercel automatically detects Vite apps. Verify these configurations are selected:
* **Framework Preset**: `Vite`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`

### Handling Client Routing (Vercel configuration)
To allow React Router DOM client routing to work correctly without 404 errors on reload, add a `vercel.json` file in your `frontend` directory:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
