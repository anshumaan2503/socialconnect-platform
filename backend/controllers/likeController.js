const likeService = require("../services/likeService");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route   POST /api/posts/:postId/like
 * @desc    Toggle like/unlike state for a post
 * @access  Private
 */
const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const result = await likeService.toggleLike(postId, req.user);

  const message = result.liked
    ? "Post liked successfully"
    : "Post unliked successfully";

  res.status(200).json({
    success: true,
    message,
    data: {
      postId,
      liked: result.liked,
      totalLikes: result.totalLikes,
    },
  });
});

module.exports = {
  toggleLike,
};
