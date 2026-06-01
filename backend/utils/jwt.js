const jwt = require("jsonwebtoken");

/**
 * @description Generates a signed JWT access token for a user
 * @param {Object} payload - Token payload content (e.g. userId)
 * @returns {String} Signed JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

/**
 * @description Verifies a signed JWT token
 * @param {String} token - Raw JWT token string
 * @returns {Object} Decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
