const express = require("express");
const { createPost, getFeed } = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { validate, validateQuery, validateParams } = require("../middlewares/validationMiddleware");
const { searchPosts } = require("../controllers/searchController");
const { toggleLike } = require("../controllers/likeController");
const { addComment } = require("../controllers/commentController");
const {
  createPostSchema,
  feedQuerySchema,
  searchQuerySchema,
  createCommentSchema,
  postIdParamSchema,
} = require("../validators/postValidator");

const router = express.Router();

// Create post route: authenticated, parses single image upload, validates body, then runs controller
router.post(
  "/",
  protect,
  upload.single("image"),
  validate(createPostSchema),
  createPost
);

// Toggle post like route: authenticated, validates path parameter, toggles like state
router.post("/:postId/like", protect, validateParams(postIdParamSchema), toggleLike);

// Add comment route: authenticated, validates path parameter, validates body text, adds comment
router.post(
  "/:postId/comment",
  protect,
  validateParams(postIdParamSchema),
  validate(createCommentSchema),
  addComment
);

// Search posts route: public, validates query parameters, then runs search controller
router.get("/search", validateQuery(searchQuerySchema), searchPosts);

// Get feed route: public, validates page and limit parameters, then runs controller
router.get("/", validateQuery(feedQuerySchema), getFeed);

module.exports = router;
