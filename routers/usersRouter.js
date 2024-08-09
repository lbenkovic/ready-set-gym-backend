import { Router } from "express";
import {
    userProfile,
    updateUserProfile,
} from "../controllers/usersController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const usersRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/user", userProfile)
        .patch("/user", updateUserProfile);
};
