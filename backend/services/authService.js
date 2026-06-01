const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/jwt");

/**
 * @description Logic for registering a new user account
 */
const register = async (userData) => {
  const { username, email, password, avatar } = userData;

  // Check if email already registered
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "Email is already registered");
  }

  // Check if username already taken
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(409, "Username is already taken");
  }

  // Create new user document
  const user = await User.create({
    username,
    email,
    password,
    avatar,
  });

  // Generate JWT token containing user identity
  const token = generateToken({ id: user._id });

  // Convert to object to trigger JSON transform output modifications
  const userJson = user.toJSON();

  return {
    user: userJson,
    token,
  };
};

/**
 * @description Logic for validating credentials and logging in a user
 */
const login = async (email, password) => {
  // Find user and explicitly select password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Confirm user account state
  if (!user.isActive) {
    throw new ApiError(403, "Your account is deactivated. Please contact support.");
  }

  // Verify secret password match
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate session token
  const token = generateToken({ id: user._id });

  const userJson = user.toJSON();

  return {
    user: userJson,
    token,
  };
};

module.exports = {
  register,
  login,
};
