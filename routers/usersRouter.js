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
        .get("/user/:email?", getUserProfile)
        .get("/users/search/:query", searchUsers)
        .patch("/user", updateUserProfile);
};
