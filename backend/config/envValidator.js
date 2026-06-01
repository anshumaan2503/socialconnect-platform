/**
 * @description Validates required environment variables during application startup.
 * Fails fast if any required variable is missing.
 */
const validateEnv = () => {
  const requiredEnvVars = [
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  const missingEnvVars = [];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  });

  if (missingEnvVars.length > 0) {
    console.error(
      `[CRITICAL] Environment variable validation failed. The following required variables are missing: \n - ${missingEnvVars.join(
        "\n - "
      )}`
    );
    process.exit(1);
  }

  // Validate PORT format
  if (isNaN(Number(process.env.PORT))) {
    console.error(`[CRITICAL] Environment validation failed: PORT "${process.env.PORT}" must be a valid number.`);
    process.exit(1);
  }

  console.log("[Env Validation] All required environment variables are present and valid.");
};

module.exports = validateEnv;
