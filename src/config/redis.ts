import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,        
  enableReadyCheck: false,           
  retryStrategy: (times) => Math.min(times * 200, 2000), 
  reconnectOnError: () => true
});

redis.on("connect", () => {
  console.log(" Redis connected");
});

redis.on("ready", () => {
  console.log(" Redis ready");
});

redis.on("error", (err) => {
  console.error(" Redis error:", err?.message || "connection issue");
});
