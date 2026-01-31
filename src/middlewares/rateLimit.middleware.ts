import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "../config/redis";

const limiter = new RateLimiterRedis({
  storeClient: redis,
  points: 100,
  duration: 60,
});

export const rateLimiter = async (req: any, res: any, next: any) => {
  try {
    await limiter.consume(req.ip);
    next();
  } catch {
    res.status(429).send("Too many requests");
  }
};
