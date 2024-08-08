import mongo from "mongodb";
import { ObjectId } from "mongodb";
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import { hashPassword } from "../services/authService.js";

const usersCollection = db.collection("users");

export default {
    async registerUser(userData) {
        // const hashedPassword = await bcrypt.hash(userData.password, 10);
        try {
            await usersCollection.insertOne({
                _id: new ObjectId(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashPassword(userData.password),
            });
            return res.status(201).json({
                message: "User created successfully",
                data: {},
            });
        } catch (error) {
            console.error(`[POST] User error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    },
};
