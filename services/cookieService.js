const TOKEN = "token";
const EMAIL = "email";

export const getCookieTokenFromReq = (req) => {
    const tokenCookie = req.cookies?.[TOKEN];
    const emailCookie = req.cookies?.[EMAIL];
    if (!tokenCookie || !emailCookie) {
        return {};
    }

    return { tokenCookie, emailCookie };
};

export const addAuthCookieToRes = (res, token, email) => {
    res.cookie(TOKEN, token, {
        maxAge: 604800000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.cookie(EMAIL, email, {
        maxAge: 604800000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
};

export const removeAuthCookieFromRes = (res) => {
    res.clearCookie("token");
    res.clearCookie("email");
};
