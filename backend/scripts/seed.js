const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");
const Post = require("../models/Post");

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined in environment variables.");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");

    // Clean existing data
    console.log("Cleaning existing users and posts...");
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("Database cleared.");

    // Avatars
    const demoAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuC0m5YSvkGquIekj3V9DLmtmx-cKgYcFnunWmxvqJwhvDW5JpHZI0fU2SUnBGTyYiMxUDdgCNeL86fJL53pck9ugj_5ToFEFqMt-eLkxx3-z4qjpuiE9RvSWFXrZ0feAL44kFcSJt4dW65Wrg4xBHQQPset6SJk-RbM8BNoXR35ex5myeEl28bUbZ7ggdxBm2oRhMs_CVv4E-AEbeEHE6G1CfMvvX9QozjJPIB5VfmUMEZ82D-shBoTQTY64MK_8GvxGmqMaIjAzus";
    const aliceAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
    const bobAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";

    // 1. Create Demo User and other users
    console.log("Creating demo users...");
    const demoUser = await User.create({
      username: "DemoUser",
      email: "demo@socialconnect.com",
      password: "Demo@123",
      avatar: demoAvatar,
    });

    const alice = await User.create({
      username: "Alice",
      email: "alice@socialconnect.com",
      password: "Alice@123",
      avatar: aliceAvatar,
    });

    const bob = await User.create({
      username: "Bob",
      email: "bob@socialconnect.com",
      password: "Bob@123",
      avatar: bobAvatar,
    });

    console.log("Users created successfully.");

    // 2. Create posts
    console.log("Seeding posts...");

    // Post 1: Text post by Alice
    const post1 = await Post.create({
      author: {
        userId: alice._id,
        username: alice.username,
        avatar: alice.avatar,
      },
      content: {
        text: "Welcome to SocialConnect! This is a clean, modern space for sharing ideas, photos, and connect with people. Have a look around!",
      },
      likes: [],
      comments: [],
    });

    // Post 2: Text post by Bob
    const post2 = await Post.create({
      author: {
        userId: bob._id,
        username: bob.username,
        avatar: bob.avatar,
      },
      content: {
        text: "Exploring the new glassmorphism interface! The dark blue container tokens and smooth hover states look extremely premium. Shoutout to the design team!",
      },
      likes: [],
      comments: [],
    });

    // Post 3: Text post by DemoUser
    const post3 = await Post.create({
      author: {
        userId: demoUser._id,
        username: demoUser.username,
        avatar: demoUser.avatar,
      },
      content: {
        text: "Hello everyone! Excited to join this network as a Demo account. Creating text and image posts is super fast and clean. Feel free to leave a comment or like this post!",
      },
      likes: [],
      comments: [],
    });

    // Post 4: Image post by Alice
    const post4 = await Post.create({
      author: {
        userId: alice._id,
        username: alice.username,
        avatar: alice.avatar,
      },
      content: {
        text: "Had an amazing weekend hiking trip up in the mountains! ⛰️ Breath-taking views and perfect weather.",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      },
      likes: [],
      comments: [],
    });

    // Post 5: Image post by Bob
    const post5 = await Post.create({
      author: {
        userId: bob._id,
        username: bob.username,
        avatar: bob.avatar,
      },
      content: {
        text: "My new workspace setup is finally complete! Minimalist desk, mechanical keyboard, and a massive monitor. Time to build some features! 💻🔥",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      },
      likes: [],
      comments: [],
    });

    console.log("Posts created successfully.");

    // 3. Add Comments
    console.log("Seeding comments...");

    // Comment 1 on Post 1 (by DemoUser)
    post1.comments.push({
      userId: demoUser._id,
      username: demoUser.username,
      text: "Thanks Alice! Thrilled to be here and test out the core features.",
      createdAt: new Date(),
    });
    post1.totalComments = 1;
    await post1.save();

    // Comment 2 on Post 4 (by Bob)
    post4.comments.push({
      userId: bob._id,
      username: bob.username,
      text: "Wow Alice, this picture looks stunning! Where is this trail located?",
      createdAt: new Date(),
    });
    post4.totalComments = 1;
    await post4.save();

    console.log("Comments added successfully.");

    // 4. Add Like (DemoUser likes Post 1)
    console.log("Seeding likes...");
    post1.likes.push({
      userId: demoUser._id,
      username: demoUser.username,
      likedAt: new Date(),
    });
    post1.totalLikes = 1;
    await post1.save();

    console.log("Likes added successfully.");
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
