import { Router } from "express";
import {
    recordWeight,
    getWeight,
    deleteWeight,
} from "../controllers/weightController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const weightRouter = () => {
    return Router()
        .use(authMiddleware)
        .post("/weight", recordWeight)
        .get("/weight", getWeight)
        .delete("/weight/:date", deleteWeight);
};
