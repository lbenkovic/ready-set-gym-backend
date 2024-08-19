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
        .post("/workout-plan", addNewWorkoutPlan)
        .get("/workout-plan", getUserWorkoutPlans)
        .delete("/workout-plan/:planId", deletePlan);
};
