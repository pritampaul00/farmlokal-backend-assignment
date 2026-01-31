import express from "express";
import { rateLimiter } from "./middlewares/rateLimit.middleware";
import { deduplicate } from "./middlewares/requestDedup.middleware";
import { listProducts } from "./modules/products/product.controller";
import { handleWebhook } from "./modules/external/webhook.controller";
import authRoutes from "./modules/auth/auth.routes";
import apiRoutes from "./modules/external/api.routes";
import { redis } from "./config/redis";
import { errorHandler } from "./middlewares/error.middleware";
import { metricsMiddleware, getMetrics } from "./modules/metrics/metrics";

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(metricsMiddleware); // ⭐ track request metrics

/**
 * Health Check Route
 */
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    redis: redis.status,
    uptime: process.uptime(),
  });
});

/**
 * Metrics Endpoint (Bonus)
 */
app.get("/metrics", (_req, res) => {
  res.json(getMetrics());
});

/**
 * Auth Debug Route (OAuth token caching test)
 */
app.use("/auth", authRoutes);

/**
 * External API Test Route (Circuit Breaker Demo)
 */
app.use("/external", apiRoutes);

/**
 * Product API (Performance critical)
 * Request deduplication prevents duplicate DB hits
 */
app.get(
  "/products",
  deduplicate(req => JSON.stringify(req.query), listProducts)
);

/**
 * Webhook endpoint (Idempotent handling)
 */
app.post("/webhook", handleWebhook);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;
