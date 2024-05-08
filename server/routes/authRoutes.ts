import express from "express";
import { loginUser, register, getProfile } from "../controllers/authController";

export const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/profile", getProfile);
