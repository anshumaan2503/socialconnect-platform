const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { validate } = require("../middlewares/validationMiddleware");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const router = express.Router();

// Public route for user registration
router.post("/register", validate(registerSchema), registerUser);

// Public route for user login
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
