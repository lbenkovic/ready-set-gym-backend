import { chatLogsCollection } from "../models/collections.js";

import { usersCollection } from "../models/collections.js";

usersCollection.createIndex({ email: 1 }, { unique: true });

export const saveMessage = async (sender, recipient, content) => {
    try {
        const existingChat = await chatLogsCollection.findOne({
            participants: { $all: [sender, recipient] },
        });

        if (existingChat) {
            await chatLogsCollection.updateOne(
                { _id: existingChat._id },
                {
                    $push: {
                        messages: {
                            sender,
                            content,
                            timestamp: new Date(),
                        },
                    },
                }
            );
        } else {
            await chatLogsCollection.insertOne({
                participants: [sender, recipient],
                messages: [
                    {
                        sender,
                        content,
                        timestamp: new Date(),
                    },
                ],
            });
        }
        return true;
    } catch (error) {
        console.error("Error saving message to chatLogs:", error);
        return false;
    }
};
