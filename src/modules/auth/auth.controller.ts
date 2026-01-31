import { Request, Response, NextFunction } from "express";
import { getAccessToken } from "./auth.service";

export const testToken = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await getAccessToken();
    res.json({
      token,
      source: "Fetched from OAuth or Redis cache"
    });
  } catch (err) {
    next(err);
  }
};
