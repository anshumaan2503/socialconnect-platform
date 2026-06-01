const cloudinary = require("cloudinary").v2;

/**
 * @description Configures Cloudinary SDK with environment keys
 */
const configureCloudinary = () => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.warn(
      "[Cloudinary] Warning: Cloudinary environment variables are missing. Image uploads will fail."
    );
    return;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("[Cloudinary] Integration initialized successfully");
};

module.exports = { cloudinary, configureCloudinary };
