import { auth } from "../services/authService.js";

export const login = async (req, res) => {
    const userData = req.body;
    try {
        const authUser = await auth(userData.email, userData.password);
        const token = authUser.token;
        return res.json({
            message: "Login successful",
            data: token,
        });
    } catch (error) {
        console.error(`[POST] Login error: ${error.message}`);
        res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};
