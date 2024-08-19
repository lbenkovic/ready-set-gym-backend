import { Router } from "express";
import { login, logout, signup, check } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = () => {
    return Router()
        .post("/auth/login", login)
        .post("/auth/signup", signup)
        .use(authMiddleware)
        .post("/auth/logout", logout)
        .get("/auth/check", check);
};
