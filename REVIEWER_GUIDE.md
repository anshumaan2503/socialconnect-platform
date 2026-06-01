# Reviewer Evaluation Guide

This guide provides a rapid, structured path to evaluate the core functionalities of the **SocialConnect** platform in **under 5 minutes**.

---

## ⏱️ Quick Walkthrough Checklist (4 mins 30s)

Please complete the following actions in order:

### 1. Register Account (Time: 45 seconds)
1. Open the application URL (or your local environment at `http://localhost:5173`).
2. Click **Create Account** below the login card to navigate to the registration form.
3. Enter a new username, email, and password. Confirm the password and accept the terms checkbox.
4. Click **Register**. You will be logged in immediately and redirected to the main Feed.
5. Click **Logout** (represented by the red logout icon in the top header) to return to the login screen.

### 2. Login (Time: 30 seconds)
1. On the login form, enter the demo credentials:
   - **Email:** `demo@socialconnect.com`
   - **Password:** `Demo@123`
2. Click **Login**. You will see the main feed populated with demo posts from `Alice`, `Bob`, and your own account `DemoUser`.

### 3. Create Post (Time: 45 seconds)
1. Click the text area inside the **Create Post Card** at the top of the feed (labeled *"What's on your mind?"*).
2. Type a short message, e.g.: *"Testing out the new real-time post creation features!"*
3. Click the **Post** button.
4. The feed updates instantly to display your new text post at the very top.

### 4. Upload Image (Time: 60 seconds)
1. In the **Create Post Card**, type a description: *"Check out this awesome workspace setup!"*
2. Click the **Image (Photo)** button at the bottom left of the card.
3. Select any image file from your local machine.
4. Once the preview appears, click **Post**.
5. Wait briefly for the image upload to complete (powered by Cloudinary). The post containing your image will appear at the top of the feed.

### 5. Search Post (Time: 30 seconds)
1. Navigate to the **Search Bar** at the top of the feed page.
2. Type `glassmorphism` or `mountain`.
3. The feed filters in real-time, showing only posts that match your search query.
4. Clear the search input to return to the full feed.

### 6. Like Post (Time: 15 seconds)
1. Locate Alice's first post (*"Welcome to SocialConnect..."*).
2. Click the **Like (Heart)** icon at the bottom of the post.
3. The heart icon changes color, and the like count increments instantly to `2`.
4. Click it again to unlike and watch the counter decrement back to `1`.

### 7. Comment Post (Time: 45 seconds)
1. Locate Bob's workspace setup post.
2. Scroll to the bottom of the card, type a comment in the input field: *"Clean setup! What monitor is that?"*
3. Press **Enter** or click the send button.
4. Your comment is appended immediately to the comment section, and the comment counter increments.

---

## 🛠️ Diagnostics & Help

If you run into issues:
* **Cannot Log In:** Make sure you ran `npm run seed` in the backend before testing, or manually register an account.
* **Image Upload Fails:** Verify that Cloudinary environment variables are configured in `backend/.env`.
* **API Connection Errors:** Verify that the backend is running (typically on port `5000`) and the frontend has the correct `VITE_API_URL` set in `frontend/.env`.
