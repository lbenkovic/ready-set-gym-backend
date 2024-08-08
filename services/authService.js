import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import db from "../database/connection.js";
import jwt from "jsonwebtoken";

const usersCollection = db.collection("users");
usersCollection.createIndex({ email: 1 }, { unique: true });

export const hashPassword = async (passwordInput) => {
    const hashedPassword = await bcrypt.hash(passwordInput, 10);
    return hashedPassword;
};

export const verifyToken = (accessToken) => {
    try {
        const tokenPayload = jwt.verify(accessToken, process.env.JWT_SECRET);
        return tokenPayload;
    } catch (error) {
        return null;
    }
};

export const auth = async (email, password) => {
    let userData = await usersCollection.findOne({ email: email });

    console.log("Received data: ", email, password);
    console.log("User data from the database: ", userData);

    if (
        userData &&
        userData.password &&
        (await bcrypt.compare(password, userData.password))
    ) {
        delete userData.password;
        let token = jwt.sign(userData, process.env.JWT_SECRET, {
            algorithm: "HS512",
            expiresIn: "1 week",
        });
        return {
            token,
            email: userData.email,
        };
    } else {
        throw new Error("Cannot authenticate");
    }
};
