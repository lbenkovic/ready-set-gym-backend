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
    .post("/diary", recordDiary)
    .get("/diary", getDiary)
    .delete("/diary/:diaryId", deleteDiary);
};
