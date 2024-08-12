import { Router } from "express";
import { getRecommendedWorkouts } from "../controllers/recommendedWorkoutController.js";

export const recommendedWorkoutsRouter = () => {
  const router = Router();
  router.get("/:workoutType", getRecommendedWorkouts);
  return router;
};
