import { Request, Response } from "express";
import { redis } from "../../config/redis";

export const handleWebhook = async (req: Request, res: Response) => {
  const eventId = req.headers["x-event-id"] as string;
  if (!eventId) return res.status(400).send("Missing event id");

  const exists = await redis.get(`webhook:${eventId}`);
  if (exists) return res.status(200).send("Duplicate ignored");

  await redis.set(`webhook:${eventId}`, "1", "EX", 86400);

  res.status(200).send("Processed");
};
