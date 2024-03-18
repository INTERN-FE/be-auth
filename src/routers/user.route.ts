import { userController } from "@/controller/user.controller";
import { Router } from "express";

export const router = Router();

router.get("/", userController.getUser);
router.get("/:userId", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:userId", userController.deleteUserById);
router.patch("/:userId", userController.updateUserByAuth);
router.patch("/:userId", userController.updateUserByAuth);
