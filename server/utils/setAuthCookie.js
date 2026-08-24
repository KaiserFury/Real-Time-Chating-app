
// HttpOnly prevents browser JavaScript from reading the session token.

export const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,

    })
}

export const clearAuthCookie = (res) => {
    return res.clearCookie("token",{
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",

    })
}