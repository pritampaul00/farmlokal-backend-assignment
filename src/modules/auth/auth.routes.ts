import { Router } from "express";
import { testToken } from "./auth.controller";

const router = Router();

router.get("/test-token", testToken);

export default router;
