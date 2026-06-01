const commentService = require("../services/commentService");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route   POST /api/posts/:postId/comment
 * @desc    Add a comment to a specific post
 * @access  Private
 */
const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  const result = await commentService.addComment(postId, req.user, text);

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: {
      comment: result.comment,
      totalComments: result.totalComments,
    },
  });
});

module.exports = {
  addComment,
};
