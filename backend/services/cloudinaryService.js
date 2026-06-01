const { Readable } = require("stream");
const { cloudinary } = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");

/**
 * @description Uploads a file buffer directly to Cloudinary using a stream
 * @param {Buffer} fileBuffer - The file buffer in memory
 * @param {String} folder - Cloudinary folder target
 * @returns {Promise<Object>} The Cloudinary upload result containing secure_url
 */
const uploadToCloudinary = (fileBuffer, folder = "socialconnect/posts") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image", // Restrict to images only
      },
      (error, result) => {
        if (error) {
          console.error("[Cloudinary Service] Upload failed:", error);
          return reject(new ApiError(500, `Cloudinary upload failed: ${error.message}`));
        }
        resolve(result);
      }
    );

    // Stream the buffer natively into Cloudinary upload stream
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

module.exports = {
  uploadToCloudinary,
};
