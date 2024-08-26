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
        .get("/weight", getWeight)
        .post("/weight", recordWeight)
        .delete("/weight/:date", deleteWeight);
};
