import { Router } from "express";
import passport_jwt from "../custom_passport/passport_jwt";

// Controllers
import * as authCtrls from "../controllers/auth.controllers";

const router = Router();

// Auth Routes
router.get("/auth", passport_jwt, authCtrls.GET_userAuthenticated);
router.post("/auth/sign-up", authCtrls.POST_signUpEmail);
router.post("/auth/sign-in", authCtrls.POST_signInEmail);

export default router;