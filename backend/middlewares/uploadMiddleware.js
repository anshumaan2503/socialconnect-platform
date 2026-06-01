const multer = require("multer");
const ApiError = require("../utils/ApiError");

// Configure memory storage to keep files in memory buffers (prevent writing local disk files)
const storage = multer.memoryStorage();

// Define whitelist of supported image MIME types
const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Implement validation filter for input file uploads
const fileFilter = (_req, file, cb) => {
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Invalid file format. Only JPEG, JPG, PNG, and WEBP images are allowed."
      ),
      false
    );
  }
};

// Instantiated Multer upload middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size
  },
  fileFilter,
});

module.exports = upload;
