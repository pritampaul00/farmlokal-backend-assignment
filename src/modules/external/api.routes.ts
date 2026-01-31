import { Router } from "express";
import { fetchFromApiA } from "./apiA.service";

const router = Router();

router.get("/test-api-a", async (_req, res, next) => {
  try {
    const response = await fetchFromApiA();
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

export default router;
