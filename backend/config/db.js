const mongoose = require("mongoose");

/**
 * @description Establishes a connection to MongoDB Atlas with auto-retry logic
 */
const connectDB = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      retries -= 1;
      console.error(`[Database] Connection failed: ${error.message}. Retries remaining: ${retries}`);
      if (retries === 0) {
        console.error("[Database] Failed to connect to MongoDB after multiple attempts. Exiting process.");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

module.exports = connectDB;
