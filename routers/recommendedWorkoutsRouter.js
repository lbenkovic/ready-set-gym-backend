import { Router } from "express";
import { getRecommendedWorkouts } from "../controllers/recommendedWorkoutController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const recommendedWorkoutsRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/recommendedWorkouts/:workoutType", getRecommendedWorkouts);
};
