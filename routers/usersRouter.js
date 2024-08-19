import { Router } from "express";
import {
    getUserProfile,
    updateUserProfile,
    searchUsers,
} from "../controllers/usersController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const usersRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/user", getUserProfile)
        .patch("/user", updateUserProfile)
        .get("/user/:query", searchUsers);
};
