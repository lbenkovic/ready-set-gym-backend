import { Router } from "express";
import { getExercises } from "../controllers/exerciseListController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const exerciseRouter = () => {
    return Router().use(authMiddleware).get("/exercises", getExercises);
};
