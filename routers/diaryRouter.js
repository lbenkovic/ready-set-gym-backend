import { Router } from "express";
import {
    recordDiary,
    getDiary,
    deleteDiary,
} from "../controllers/diaryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const diaryRouter = () => {
    return Router()
        .use(authMiddleware)
        .get("/diary", getDiary)
        .post("/diary", recordDiary)
        .delete("/diary/:diaryId", deleteDiary);
};
