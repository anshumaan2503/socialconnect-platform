/**
 * @description Wrapper utility to capture uncaught async errors in routes and forward to error middleware
 * @param {Function} requestHandler - Express route handler function
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

module.exports = asyncHandler;
