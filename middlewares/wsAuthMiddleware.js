import { usersCollection } from "../models/collections.js";

export const wsAuthMiddleware = async (ws, req, next) => {
    const userEmail = req.query.userEmail;

    if (!userEmail) {
        ws.close(4001, "Unauthorized: No email provided");
        return;
    }

    try {
        const user = await usersCollection.findOne({ email: userEmail });

        if (!user) {
            ws.close(4001, "Unauthorized: Invalid email");
            return;
        }

        req.user = { email: userEmail };
        next();
    } catch (error) {
        console.error("WebSocket authentication error:", error);
        ws.close(4001, "Internal server error");
    }
};
