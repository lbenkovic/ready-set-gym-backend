import { verifyToken } from "../services/authService.js";
import { getCookieTokenFromReq } from "../services/cookieService.js";
export const authMiddleware = (req, res, next) => {
    const { tokenCookie, emailCookie } = getCookieTokenFromReq(req);
    if (!tokenCookie || !emailCookie) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = verifyToken(tokenCookie);
        req.user = decoded;

        if (emailCookie && emailCookie === decoded.email) {
            next();
        } else {
            return res
                .status(401)
                .json({ message: "Email mismatch or not found" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
