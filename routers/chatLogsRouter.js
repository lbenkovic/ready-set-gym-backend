import { Router } from "express";
import { getChatHistory } from "../controllers/chatLogsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const chatLogsRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/chat-logs/:recipientEmail", getChatHistory);
};
