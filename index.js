import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routers/authRouter.js";
import { usersRouter } from "./routers/usersRouter.js";
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
app.use("/", authRouter());
app.use("/", usersRouter());

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
