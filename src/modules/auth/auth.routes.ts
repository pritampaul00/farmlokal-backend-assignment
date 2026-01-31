import { Router } from "express";
import { testToken } from "./auth.controller";

const router = Router();

/**
 * GET /auth/test-token
 * Used to verify OAuth token caching via Redis
 */
router.get("/test-token", testToken);

export default router;
