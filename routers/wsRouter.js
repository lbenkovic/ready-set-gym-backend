import expressWs from "express-ws";
import { handleWebSocketConnection } from "../controllers/wsController.js";
import { wsAuthMiddleware } from "../middlewares/wsAuthMiddleware.js";

export const webSocketRouter = (app) => {
    expressWs(app);

    app.ws("/socket", (ws, req) => {
        wsAuthMiddleware(ws, req, () => handleWebSocketConnection(ws, req));
    });
};
