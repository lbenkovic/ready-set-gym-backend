import { Router } from "express";
import { login, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = () => {
    return Router()
        .post("/login", login)
        .use(authMiddleware)
        .post("/logout", logout);
};
