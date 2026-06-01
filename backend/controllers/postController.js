const postService = require("../services/postService");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route   POST /api/posts
 * @desc    Create a new post with text and/or image upload
 * @access  Private
 */
const createPost = asyncHandler(async (req, res) => {
  // req.file is added by uploadMiddleware (multer)
  // req.user is added by authMiddleware (protect)
  const post = await postService.createPost(
    req.user,
    req.body.text,
    req.file,
    req.body.imageUrl
  );

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

/**
 * @route   GET /api/posts
 * @desc    Get paginated chronological social posts
 * @access  Public
 */
const getFeed = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const result = await postService.getFeed(page, limit);

  res.status(200).json({
    success: true,
    message: "Feed fetched successfully",
    data: result,
  });
});

module.exports = {
  createPost,
  getFeed,
};
