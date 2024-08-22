import { saveMessage } from "../services/chatLogsService.js";

const activeConnections = {};

export const handleWebSocketConnection = (ws, req) => {
    const userEmail = req.user.email;
    if (!activeConnections[userEmail]) {
        activeConnections[userEmail] = ws;
    }
    console.log(activeConnections);
    ws.on("message", async (msg) => {
        const parsedMsg = JSON.parse(msg);
        const { recipient, content } = parsedMsg;

        try {
            await saveMessage(userEmail, recipient, content);
            if (activeConnections[recipient]) {
                activeConnections[recipient].send(
                    JSON.stringify({
                        sender: userEmail,
                        content,
                        timestamp: new Date(),
                    })
                );
            }
        } catch (error) {
            console.error("Error handling message:", error);
        }
    });

    ws.on("close", () => {
        delete activeConnections[userEmail];
    });

    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
    });
};
