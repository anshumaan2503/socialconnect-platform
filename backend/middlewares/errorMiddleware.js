const ApiError = require("../utils/ApiError");

/**
 * @description Centralized Express error handler middleware
 */
const errorMiddleware = (err, req, res, _next) => {
  let error = err;

  // Intercept Multer limits errors
  if (err.code === "LIMIT_FILE_SIZE") {
    error = new ApiError(400, "File size is too large. Maximum allowed size is 5MB.");
  }

  // Convert standard Node/Express errors to ApiError instance
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, false, err.stack);
  }

  // Build standard response structure
  const response = {
    success: false,
    message: error.message,
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  // Log error stack trace for debugging if not in production
  if (process.env.NODE_ENV !== "production") {
    console.error(`[Error] ${error.statusCode} - ${error.message}`);
  }

  res.status(error.statusCode).json(response);
};

module.exports = errorMiddleware;
