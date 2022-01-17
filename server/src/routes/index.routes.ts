import { Router } from "express";

// Controllers
import * as authCtrls from "../controllers/auth.controllers";

const router = Router();

// Auth Routes
router.post("/auth/sign-up", authCtrls.POST_signUpEmail);

export default router;