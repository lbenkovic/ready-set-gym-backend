import db from "../database/connection.js";
import { ObjectId } from "mongodb";

const usersCollection = db.collection("users");
const weightCollection = db.collection("weight");

export const recordWeight = async (req, res) => {
    const email = req.cookies.email;
    try {
        const { weight } = req.body;
        const user = await usersCollection.findOne({
            email: email,
        });

        if (user) {
            await weightCollection.insertOne({
                email: user.email,
                weight: parseInt(weight),
                month: new Date().toLocaleString("en-US", {
                    month: "long",
                }),
            });
            return res.json({
                message: "Weight data saved successfully.",
                data: {},
            });
        } else {
            return res
                .status(404)
                .json({ message: "User not found", data: {} });
        }
    } catch (error) {
        console.error(`[POST] Weight error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const getWeight = async (req, res) => {
    const email = req.cookies.email;
    try {
        const weights = await weightCollection.find({ email: email }).toArray();
        return res.json({
            message: "Weight data retrieved successfully.",
            data: { weights },
        });
    } catch (error) {
        console.error(`[GET] Weight error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};
