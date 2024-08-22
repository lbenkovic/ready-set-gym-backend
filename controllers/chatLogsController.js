import { chatLogsCollection } from "../models/collections.js";

export const getChatHistory = async (req, res) => {
    const userEmail = req.cookies.email;
    const recipient = req.params.recipientEmail;

    try {
        const chatLog = await chatLogsCollection.findOne({
            participants: { $all: [userEmail, recipient] },
        });
        if (chatLog) {
            return res.json({
                message: "Chat log retrieved successfully.",
                data: { chatLog },
            });
        }
    } catch (error) {
        console.error(`[GET] Chat history error: ${error.message}`);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
};
