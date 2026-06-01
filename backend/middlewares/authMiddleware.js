const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/jwt");

/**
 * @description Protects routes by validating JWT and appending user object to request
 */
const protect = asyncHandler(async (req, _res, next) => {
  let token;

  // Retrieve token from Authorization header (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "Authentication token is missing. Access denied."));
  }

  try {
    // Decode token and verify signature
    const decoded = verifyToken(token);

    // Fetch user and check existence
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ApiError(401, "The user belonging to this token no longer exists."));
    }

    // Confirm account is active
    if (!user.isActive) {
      return next(new ApiError(401, "User account has been deactivated."));
    }

    // Attach user payload to request
    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid token. Authorization failed."));
  }
});

module.exports = {
  protect,
};
