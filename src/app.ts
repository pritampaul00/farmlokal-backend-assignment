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
app.use(metricsMiddleware); 

app.get("/", (_req, res) => {
  res.send("FarmLokal Backend is running 🚀");
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    redis: redis.status,
    uptime: process.uptime(),
  });
});

app.get("/metrics", (_req, res) => {
  res.json(getMetrics());
});

app.use("/auth", authRoutes);

app.use("/external", apiRoutes);

app.get(
  "/products",
  deduplicate(req => JSON.stringify(req.query), listProducts)
);

app.post("/webhook", handleWebhook);

app.use(errorHandler);

export default app;
