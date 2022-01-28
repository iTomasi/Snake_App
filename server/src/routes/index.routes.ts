import { Router } from "express";
import passport_jwt from "../custom_passport/passport_jwt";

// Controllers
import * as authCtrls from "../controllers/auth.controllers";
import * as userCtrls from "../controllers/user.controllers";
import * as appCtrls from "../controllers/app.controllers";

const router = Router();

// Auth Routes
router.get("/auth", passport_jwt, authCtrls.GET_userAuthenticated);
router.post("/auth/sign-up", authCtrls.POST_signUpEmail);
router.post("/auth/sign-in", authCtrls.POST_signInEmail);

// User Routes
router.get("/user/:username", userCtrls.GET_user);
router.put("/user", passport_jwt, userCtrls.PUT_updateUser);

// App Routes
router.get("/app/leaderboard", appCtrls.GET_leaderboard);

export default router;