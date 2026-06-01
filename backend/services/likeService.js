const mongoose = require("mongoose");
const Post = require("../models/Post");
const ApiError = require("../utils/ApiError");

/**
 * @description Toggles user like on a specific post
 * @param {String} postId - Post ID target
 * @param {Object} user - Authenticated user object
 * @returns {Promise<Object>} Toggle result: { liked: boolean, totalLikes: number }
 */
const toggleLike = async (postId, user) => {
  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID format");
  }

  // Fetch the target post
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Check if user has already liked the post
  const likeIndex = post.likes.findIndex(
    (like) => like.userId.toString() === user._id.toString()
  );

  let liked = false;

  if (likeIndex > -1) {
    // User already liked, so perform unlike
    post.likes.splice(likeIndex, 1);
    liked = false;
  } else {
    // User has not liked, so perform like
    post.likes.push({
      userId: user._id,
      username: user.username,
      likedAt: new Date(),
    });
    liked = true;
  }

  // Ensure totalLikes is synchronized and non-negative
  post.totalLikes = Math.max(0, post.likes.length);

  await post.save();

  return {
    liked,
    totalLikes: post.totalLikes,
  };
};

module.exports = {
  toggleLike,
};
