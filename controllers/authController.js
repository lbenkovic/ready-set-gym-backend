import { auth } from "../services/authService.js";
import {
    addAuthCookieToRes,
    removeAuthCookieFromRes,
} from "../services/cookieService.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { usersCollection } from "../models/collections.js";
usersCollection.createIndex({ email: 1 }, { unique: true });

export const signup = async (req, res) => {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    try {
        await usersCollection.insertOne({
            _id: new ObjectId(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hashedPassword,
        });
        return res.json({ message: "Signup successful", data: {} });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(401).json({
                message: "Email already exists. Please choose a different one.",
                data: {},
            });
        } else {
            console.error(`[POST] Signup error: ${error.message}`);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const authUser = await auth(email, password);
        const token = authUser.token;
        addAuthCookieToRes(res, token, email);
        return res.json({ message: "Login successful", data: {} });
    } catch (error) {
        console.error(`[POST] Login error: ${error.message}`);
        res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const logout = async (req, res) => {
    removeAuthCookieFromRes(res);
    return res.json({
        message: "Logout successful",
        data: {},
    });
};

export const check = async (req, res) => {
    return res.json({
        message: "Authenticated",
        data: {},
    });
};
