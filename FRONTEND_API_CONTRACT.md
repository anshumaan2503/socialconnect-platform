# SocialConnect Frontend API Contract

This document provides a precise specification of all backend endpoints. The frontend framework (React + Zustand + Axios) and Stitch UI generation must adhere to these specifications.

---

## 1. Authentication Endpoints

### Register User
* **Endpoint**: `/api/auth/register`
* **Method**: `POST`
* **Authentication Required**: `No`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "username": "jane_doe",
    "email": "jane@example.com",
    "password": "securepassword123",
    "avatar": "https://example.com/avatar.png"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "665c123abc...",
        "username": "jane_doe",
        "email": "jane@example.com",
        "avatar": "https://example.com/avatar.png",
        "isActive": true,
        "createdAt": "2026-06-01T20:00:00.000Z",
        "updatedAt": "2026-06-01T20:00:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
* **Error Response (400 Bad Request / Validation Failure)**:
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": [
      "Username must be at least 3 characters long",
      "Please provide a valid email address",
      "Password must be at least 6 characters long"
    ]
  }
  ```
* **Validation Rules**:
  * `username`: String (3 to 30 characters, alphanumeric and underscores only, required).
  * `email`: String (valid email syntax, required).
  * `password`: String (minimum 6 characters, required).
  * `avatar`: String (valid URL, optional).
* **Common Failure Cases**:
  * Email or username already registered (400 Bad Request).
  * Missing required body fields.

---

### Login User
* **Endpoint**: `/api/auth/login`
* **Method**: `POST`
* **Authentication Required**: `No`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "_id": "665c123abc...",
        "username": "jane_doe",
        "email": "jane@example.com",
        "avatar": "https://example.com/avatar.png",
        "isActive": true,
        "createdAt": "2026-06-01T20:00:00.000Z",
        "updatedAt": "2026-06-01T20:00:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
* **Error Response (401 Unauthorized / Invalid Credentials)**:
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```
* **Validation Rules**:
  * `email`: String (valid email syntax, required).
  * `password`: String (required).
* **Common Failure Cases**:
  * Password mismatch or email not registered.

---

## 2. Post Endpoints

### Create Post
* **Endpoint**: `/api/posts`
* **Method**: `POST`
* **Authentication Required**: `Yes`
* **Headers**:
  * `Authorization: Bearer <token>`
  * `Content-Type: multipart/form-data`
* **Request Body (Multipart Form)**:
  * `text`: String (max 2000 characters, optional)
  * `image`: Binary file (JPEG, JPG, PNG, WEBP, max 5MB, optional)
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Post created successfully",
    "data": {
      "author": {
        "userId": "665c123abc...",
        "username": "jane_doe",
        "avatar": "https://example.com/avatar.png"
      },
      "content": {
        "text": "Check out this beautiful design!",
        "imageUrl": "https://res.cloudinary.com/..."
      },
      "likes": [],
      "comments": [],
      "totalLikes": 0,
      "totalComments": 0,
      "_id": "665c456def...",
      "createdAt": "2026-06-01T20:05:00.000Z",
      "updatedAt": "2026-06-01T20:05:00.000Z"
    }
  }
  ```
* **Error Response (400 Bad Request / Validation Failure)**:
  ```json
  {
    "success": false,
    "message": "Post content must contain at least text or an image"
  }
  ```
* **Validation Rules**:
  * Either `text` or `image` file must be present.
  * `text` length cannot exceed 2000 characters.
  * Image format must be JPEG, JPG, PNG, or WEBP.
  * Image size cannot exceed 5MB.
* **Common Failure Cases**:
  * Empty post (neither text nor image provided).
  * File size limit exceeded.
  * Unauthorized caller (missing or invalid Bearer token).

---

### Get Feed
* **Endpoint**: `/api/posts`
* **Method**: `GET`
* **Authentication Required**: `No`
* **Headers**: `None`
* **Query Parameters**:
  * `page`: Integer (minimum 1, default `1`, optional)
  * `limit`: Integer (minimum 1, maximum 20, default `10`, optional)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Feed retrieved successfully",
    "data": {
      "posts": [
        {
          "_id": "665c456def...",
          "author": {
            "userId": "665c123abc...",
            "username": "jane_doe",
            "avatar": "https://example.com/avatar.png"
          },
          "content": {
            "text": "Hello world!",
            "imageUrl": ""
          },
          "likes": [],
          "comments": [],
          "totalLikes": 0,
          "totalComments": 0,
          "createdAt": "2026-06-01T20:05:00.000Z",
          "updatedAt": "2026-06-01T20:05:00.000Z"
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalPosts": 48,
        "hasNextPage": true
      }
    }
  }
  ```
* **Validation Rules**:
  * `page`: Integer (min 1).
  * `limit`: Integer (min 1, max 20).

---

### Search Posts
* **Endpoint**: `/api/posts/search`
* **Method**: `GET`
* **Authentication Required**: `No`
* **Headers**: `None`
* **Query Parameters**:
  * `q`: String (minimum 2 characters, required)
  * `page`: Integer (minimum 1, default `1`, optional)
  * `limit`: Integer (minimum 1, maximum 20, default `10`, optional)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Search completed successfully",
    "data": {
      "posts": [
        {
          "_id": "665c456def...",
          "author": {
            "userId": "665c123abc...",
            "username": "jane_doe",
            "avatar": "https://example.com/avatar.png"
          },
          "content": {
            "text": "Check out this react tutorial!",
            "imageUrl": ""
          },
          "likes": [],
          "comments": [],
          "totalLikes": 0,
          "totalComments": 0,
          "createdAt": "2026-06-01T20:05:00.000Z",
          "updatedAt": "2026-06-01T20:05:00.000Z"
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalPosts": 1,
        "hasNextPage": false
      }
    }
  }
  ```
* **Success Response - No Results (200 OK)**:
  ```json
  {
    "success": true,
    "message": "No matching posts found",
    "data": {
      "posts": []
    }
  }
  ```
* **Validation Rules**:
  * `q`: String (required, min 2 characters).
  * `page`: Integer (min 1).
  * `limit`: Integer (min 1, max 20).

---

## 3. Social Interaction Endpoints

### Toggle Post Like
* **Endpoint**: `/api/posts/:postId/like`
* **Method**: `POST`
* **Authentication Required**: `Yes`
* **Headers**:
  * `Authorization: Bearer <token>`
* **Request Body**: `None`
* **Success Response - Liked (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Post liked successfully",
    "data": {
      "postId": "665c456def...",
      "liked": true,
      "totalLikes": 1
    }
  }
  ```
* **Success Response - Unliked (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Post unliked successfully",
    "data": {
      "postId": "665c456def...",
      "liked": false,
      "totalLikes": 0
    }
  }
  ```
* **Validation Rules**:
  * `postId`: String (required, hex 24-character ObjectId).

---

### Add Comment
* **Endpoint**: `/api/posts/:postId/comment`
* **Method**: `POST`
* **Authentication Required**: `Yes`
* **Headers**:
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "text": "Great insights, thanks for sharing!"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Comment added successfully",
    "data": {
      "comment": {
        "userId": "665c123abc...",
        "username": "jane_doe",
        "text": "Great insights, thanks for sharing!",
        "createdAt": "2026-06-01T20:10:00.000Z",
        "_id": "665c789ghi..."
      },
      "totalComments": 1
    }
  }
  ```
* **Validation Rules**:
  * `postId`: String (required, hex 24-character ObjectId).
  * `text`: String (required, min 1 character, max 500 characters, trimmed).

---

## 4. Diagnostics & Health

### System Health
* **Endpoint**: `/api/health`
* **Method**: `GET`
* **Authentication Required**: `No`
* **Headers**: `None`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Server is healthy and operational",
    "data": {
      "uptime": "154s",
      "database": "Connected",
      "environment": "development"
    }
  }
  ```
