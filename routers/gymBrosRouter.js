import { Router } from "express";
import {
    acceptPendingRequest,
    cancelPendingRequest,
    denyPendingRequest,
    getGymBros,
    getPendingRequests,
    savePendingRequest,
    getSentRequests,
} from "../controllers/gymBrosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const gymBrosRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/gym-bros", getGymBros)
        .get("/gym-bros/requests", getPendingRequests)
        .get("/gym-bros/requests/sent", getSentRequests)

        .post("/gym-bros/requests", savePendingRequest)
        .post("/gym-bros/requests/accept", acceptPendingRequest)
        .post("/gym-bros/requests/deny", denyPendingRequest)
        .post("/gym-bros/requests/cancel", cancelPendingRequest);
};
