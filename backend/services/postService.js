const Post = require("../models/Post");
const ApiError = require("../utils/ApiError");
const { uploadToCloudinary } = require("./cloudinaryService");

/**
 * @description Creates a new post in the database
 * @param {Object} user - The user object from request
 * @param {String} text - Text content of the post
 * @param {Object} file - Multer uploaded file object (optional)
 * @param {String} imageUrl - Pre-uploaded or external image URL (optional)
 */
const createPost = async (user, text, file, imageUrl) => {
  let finalImageUrl = imageUrl || "";

  // If a file is uploaded, stream it to Cloudinary
  if (file) {
    const uploadResult = await uploadToCloudinary(file.buffer);
    finalImageUrl = uploadResult.secure_url;
  }

  // Verify that at least one of text or imageUrl is populated
  const textExists = text && text.trim().length > 0;
  const imageExists = finalImageUrl && finalImageUrl.trim().length > 0;

  if (!textExists && !imageExists) {
    throw new ApiError(400, "Post must contain either text or an image");
  }

  const post = await Post.create({
    author: {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
    },
    content: {
      text: textExists ? text.trim() : undefined,
      imageUrl: imageExists ? finalImageUrl.trim() : undefined,
    },
  });

  return post;
};

/**
 * @description Retrieves a paginated list of posts, sorted by newest first
 * @param {Number} page - Current page index
 * @param {Number} limit - Number of items per page
 */
const getFeed = async (page, limit) => {
  const skip = (page - 1) * limit;

  // Retrieve posts sorted by newest first and count total
  const [posts, totalPosts] = await Promise.all([
    Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);
  const hasNextPage = page < totalPages;

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage,
    },
  };
};

module.exports = {
  createPost,
  getFeed,
};
