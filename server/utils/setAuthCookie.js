
export const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        // HttpOnly prevents browser JavaScript from reading the session token.
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,

    })
}

export const clearAuthCookie = (res) => {
    return res.clearCookie("token",{
        // Match the set options so the browser clears the same cookie.
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",

    })
}
