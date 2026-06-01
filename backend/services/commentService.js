const mongoose = require("mongoose");
const Post = require("../models/Post");
const ApiError = require("../utils/ApiError");

/**
 * @description Adds a comment to a post
 * @param {String} postId - Post ID target
 * @param {Object} user - Authenticated user object
 * @param {String} text - Comment text
 * @returns {Promise<Object>} The added comment and the updated totalComments count
 */
const addComment = async (postId, user, text) => {
  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID format");
  }

  // Fetch the target post
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Push new comment subdocument
  post.comments.push({
    userId: user._id,
    username: user.username,
    text: text.trim(),
    createdAt: new Date(),
  });

  // Keep totalComments synchronized with array length
  post.totalComments = post.comments.length;

  await post.save();

  // Retrieve the newly appended comment
  const comment = post.comments[post.comments.length - 1];

  return {
    comment,
    totalComments: post.totalComments,
  };
};

module.exports = {
  addComment,
};
