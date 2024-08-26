import { Router } from "express";
import {
    getRecipes,
    recordRecipes,
    deleteRecipes,
} from "../controllers/recipesController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const recipesRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/recipe", getRecipes)
        .post("/recipe", recordRecipes)
        .delete("/recipe/:recipeId", deleteRecipes);
};
