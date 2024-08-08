import db from "../database/connection.js";

const usersCollection = db.collection("users");

export const userProfile = async (req, res) => {
    try {
        const user = await usersCollection.findOne({
            email: req.headers.email,
        });
        return res.json({
            message: "User data retrieved successfully.",
            data: { user },
        });
    } catch (error) {
        console.error(`[GET] Users error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};
