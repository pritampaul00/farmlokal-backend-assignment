import { redis } from "../../config/redis";
import { findProducts } from "./product.repository";

export const getProducts = async (query: any) => {
  const cacheKey = `products:${JSON.stringify(query)}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const data = await findProducts(query);

  await redis.set(cacheKey, JSON.stringify(data), "EX", 60); 

  return data;
};
