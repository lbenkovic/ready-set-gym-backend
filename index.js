import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { auth } from "./services/authService.js";
import { registerUser } from "./services/usersService.js";
import cors from "cors";
import db from "./database/connection.js";
import mongo from "mongodb";
import { authRouter } from "./routers/authRouter.js";
import { usersRouter } from "./routers/usersRouter.js";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Hello"));
app.use("/", authRouter());
app.use("/", usersRouter());
// app.get("/users2", async (req, res) => {
//     try {
//         const movies = await db
//             .collection("users")
//             .find({})
//             .limit(10)
//             .toArray();
//         res.json(movies);
//     } catch (error) {
//         console.error("Error fetching user list:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

app.post("/users", async (req, res) => {
    const userData = req.body;
    try {
        const respData = await usersController.registerUser(userData);
        res.json(respData);
    } catch (error) {
        res.status(500).json({
            error: "Email already exists. Please choose a different one.",
        });
    }
});

// app.post("/auth", async (req, res) => {
//     let userData = req.body;
//     try {
//         const respData = await auth(userData.email, userData.password);
//         res.json({ token: respData.token });
//     } catch (error) {
//         res.status(403).json({ error: error.message });
//     }
// });

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
