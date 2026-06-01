const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const validateEnv = require("./config/envValidator");
validateEnv();

// Global Uncaught Exception handler
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION: Server shutting down...", err);
  process.exit(1);
});

const connectDB = require("./config/db");
const { configureCloudinary } = require("./config/cloudinary");
const errorMiddleware = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/ApiError");
const asyncHandler = require("./utils/asyncHandler");

const app = express();

// 1. Logger Middleware
app.use(morgan("dev"));

// 2. Security Headers Configuration via Helmet
app.use(helmet());

// 3. CORS Policy Integration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// 4. Request Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Global API Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// 6. Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// 7. Post Routes
const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

// 8. Test/Verification Routes
app.get(
  "/api/health",
  asyncHandler(async (_req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatusMap = {
      0: "Disconnected",
      1: "Connected",
      2: "Connecting",
      3: "Disconnecting",
    };

    res.status(200).json({
      success: true,
      message: "Server is healthy and operational",
      data: {
        uptime: `${Math.floor(process.uptime())}s`,
        database: dbStatusMap[dbState] || "Unknown",
        environment: process.env.NODE_ENV || "development",
      },
    });
  })
);

app.get(
  "/api/test-error",
  asyncHandler(async (_req, _res) => {
    throw new ApiError(
      400,
      "This is a custom operational error thrown for testing the Centralized Error Handling architecture."
    );
  })
);

// 7. Catch-All Route (404 Not Found Handling)
app.use("*", (_req, _res, next) => {
  next(new ApiError(404, `API Endpoint ${_req.originalUrl} not found`));
});

// 8. Centralized Global Error Handling Middleware
app.use(errorMiddleware);

// 9. Server Bootstrapping Flow
const PORT = process.env.PORT || 5000;
let serverInstance;

const startServer = async () => {
  // Connect to MongoDB Atlas (Wait for successful connection)
  await connectDB();

  // Configure Cloudinary Integration
  configureCloudinary();

  // Start Express server listener
  serverInstance = app.listen(PORT, () => {
    console.log(`[Server] running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
};

// Global Unhandled Rejection handler
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION: Server shutting down...", err);
  if (serverInstance) {
    serverInstance.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

startServer();
