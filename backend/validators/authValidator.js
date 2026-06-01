const Joi = require("joi");

// Register input payload verification schema
const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username cannot exceed 30 characters",
      "string.pattern.base": "Username can only contain alphanumeric characters and underscores",
      "any.required": "Username is required",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  avatar: Joi.string().uri().optional(),
});

// Login input payload verification schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .required()
    .messages({
      "any.required": "Password is required",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
