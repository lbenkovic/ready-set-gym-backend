import { Router } from "express";
import {
    addNewWorkoutPlan,
    getUserWorkoutPlans,
    deletePlan,
} from "../controllers/workoutPlansController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const workoutPlanRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/workout-plan", getUserWorkoutPlans)
        .post("/workout-plan", addNewWorkoutPlan)
        .delete("/workout-plan/:planId", deletePlan);
};
