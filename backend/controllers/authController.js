const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user credentials and return session token
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

module.exports = {
  registerUser,
  loginUser,
};
