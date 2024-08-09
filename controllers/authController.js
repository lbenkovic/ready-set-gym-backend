import { auth } from "../services/authService.js";
import {
    addAuthCookieToRes,
    removeAuthCookieFromRes,
} from "../services/cookieService.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
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
