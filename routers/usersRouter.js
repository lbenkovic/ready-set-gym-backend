import { Router } from "express";
import { userProfile } from "../controllers/usersController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const usersRouter = () => {
    return Router().get("/users/profile", userProfile).use(authMiddleware);
};
