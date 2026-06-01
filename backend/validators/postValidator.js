const Joi = require("joi");

const createPostSchema = Joi.object({
  text: Joi.string().trim().max(2000).optional().messages({
    "string.max": "Post content cannot exceed 2000 characters",
  }),
  imageUrl: Joi.string().uri().optional().messages({
    "string.uri": "Image URL must be a valid URI format",
  }),
});

const feedQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.min": "Page number must be at least 1",
  }),
  limit: Joi.number().integer().min(1).max(20).default(10).messages({
    "number.max": "Limit cannot exceed 20",
  }),
});

const searchQuerySchema = Joi.object({
  q: Joi.string().trim().min(2).required().messages({
    "string.min": "Search query must be at least 2 characters long",
    "any.required": "Search query is required",
    "string.empty": "Search query cannot be empty",
  }),
  page: Joi.number().integer().min(1).default(1).messages({
    "number.min": "Page number must be at least 1",
  }),
  limit: Joi.number().integer().min(1).max(20).default(10).messages({
    "number.max": "Limit cannot exceed 20",
  }),
});

const createCommentSchema = Joi.object({
  text: Joi.string().trim().min(1).max(500).required().messages({
    "string.empty": "Comment text cannot be empty",
    "string.min": "Comment text must contain at least 1 character",
    "string.max": "Comment cannot exceed 500 characters",
    "any.required": "Comment text is required",
  }),
});

const postIdParamSchema = Joi.object({
  postId: Joi.string().hex().length(24).required().messages({
    "string.hex": "Post ID must be a hexadecimal string",
    "string.length": "Post ID must be exactly 24 characters long",
    "any.required": "Post ID is required",
  }),
});

module.exports = {
  createPostSchema,
  feedQuerySchema,
  searchQuerySchema,
  createCommentSchema,
  postIdParamSchema,
};
