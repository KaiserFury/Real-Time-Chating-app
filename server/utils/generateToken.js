import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    // JWT payloads are signed, not encrypted, so keep them minimal and non-sensitive.
    const token = jwt.sign(
        { userId: userId.toString() },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return token;
};
