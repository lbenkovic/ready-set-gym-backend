import { Router } from "express";
import {
    acceptPendingRequest,
    cancelPendingRequest,
    denyPendingRequest,
    getGymBros,
    getPendingRequests,
    savePendingRequest,
} from "../controllers/gymBrosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const gymBrosRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/gym-bros", getGymBros)
        .get("/gym-bros-requests", getPendingRequests)
        .post("/gym-bros-request", savePendingRequest)
        .post("/gym-bros-accept", acceptPendingRequest)
        .post("/gym-bros-deny", denyPendingRequest)
        .post("/gym-bros-cancel-request", cancelPendingRequest);
};
