import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "products_db",

  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

  OAUTH_TOKEN_URL: process.env.OAUTH_TOKEN_URL || "",
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID || "",
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET || "",
  OAUTH_AUDIENCE: process.env.OAUTH_AUDIENCE || "",

  API_A_URL: process.env.API_A_URL || "",
  BASE_URL: process.env.BASE_URL || ""
};
