import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { webSocketRouter } from "./routers/wsRouter.js";
import { authRouter } from "./routers/authRouter.js";
import { usersRouter } from "./routers/usersRouter.js";
import { recommendedWorkoutsRouter } from "./routers/recommendedWorkoutsRouter.js";
import { diaryRouter } from "./routers/diaryRouter.js";
import { weightRouter } from "./routers/weightRouter.js";
import { recipesRouter } from "./routers/recipesRouter.js";
import { workoutPlanRouter } from "./routers/workoutPlanRouter.js";
import { exerciseRouter } from "./routers/exerciseRouter.js";
import { gymBrosRouter } from "./routers/gymBrosRouter.js";
import { chatLogsRouter } from "./routers/chatLogsRouter.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

webSocketRouter(app);
app.use("/", authRouter());
app.use("/", usersRouter());
app.use("/", recommendedWorkoutsRouter());
app.use("/", diaryRouter());
app.use("/", weightRouter());
app.use("/", recipesRouter());
app.use("/", workoutPlanRouter());
app.use("/", exerciseRouter());
app.use("/", gymBrosRouter());
app.use("/", chatLogsRouter());

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
