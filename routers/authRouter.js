import { Router } from "express";
import { login } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = () => {
    return Router().post("/auth", login).use(authMiddleware);
};
