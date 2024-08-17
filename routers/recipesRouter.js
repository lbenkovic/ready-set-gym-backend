import { Router } from "express";
import {
  getRecipes,
  recordRecipes,
  deleteRecipe,
} from "../controllers/recipesController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const recipesRouter = () => {
  return Router()
    .use(authMiddleware)
    .post("/recipe", recordRecipes)
    .get("/recipe", getRecipes)
    .delete("/recipe/:recipeId", deleteRecipe);
};
