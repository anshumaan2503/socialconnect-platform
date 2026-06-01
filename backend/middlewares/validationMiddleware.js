const ApiError = require("../utils/ApiError");

/**
 * @description Factory middleware that runs a Joi validation schema against request body
 * @param {Object} schema - Joi validation schema instance
 */
const validate = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true, // Remove keys that are not defined in the schema
  });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return next(new ApiError(400, "Validation failed", errorDetails));
  }

  req.body = value;
  next();
};

/**
 * @description Factory middleware that runs a Joi validation schema against request query parameters
 * @param {Object} schema - Joi validation schema instance
 */
const validateQuery = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return next(new ApiError(400, "Validation failed", errorDetails));
  }

  req.query = value;
  next();
};

/**
 * @description Factory middleware that runs a Joi validation schema against request path parameters
 * @param {Object} schema - Joi validation schema instance
 */
const validateParams = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.params, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return next(new ApiError(400, "Validation failed", errorDetails));
  }

  req.params = value;
  next();
};

module.exports = {
  validate,
  validateQuery,
  validateParams,
};
