import { authController } from "../controller/auth.controller.js";
import { Router } from "express";

export const router = Router();

router.post("/signin", authController.signIn);
router.post("/signup", authController.signUp);
