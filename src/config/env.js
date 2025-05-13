const dotenv = require("dotenv");
const path = require("path");
const AppError = require("../utils/appError");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const requiredVars = [
  "DATABASE_URL",
  "JWT_SECRET",
  "NODE_ENV",
  "PORT",
  "REDIS_HOST",
  "REDIS_PORT",
];

requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new AppError(`Missing the environment variable: ${varName}`, 500);
  }
});

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  jwtSecret: process.env.JWT_SECRET,
  serverUrl: process.env.SERVER_URL,
  redisHost: isDev ? "localhost" : process.env.REDIS_HOST,
  redisPort: isDev ? 6379 : process.env.REDIS_PORT,
  redisUsername: isDev ? undefined : process.env.REDIS_USERNAME,
  redisPassword: isDev ? undefined : process.env.REDIS_PASSWORD,
};
