const searchService = require("../services/searchService");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route   GET /api/posts/search
 * @desc    Search posts based on text search query
 * @access  Public
 */
const searchPosts = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const result = await searchService.searchPosts(q, page, limit);

  // If no posts matched the text query
  if (result.posts.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No matching posts found",
      data: {
        posts: [],
      },
    });
  }

  res.status(200).json({
    success: true,
    message: "Search completed successfully",
    data: result,
  });
});

module.exports = {
  searchPosts,
};
