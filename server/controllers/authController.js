import bcrypt from "bcrypt";
import User from "../models/User.js";

const BCRYPT_ROUNDS = 12;

export const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (typeof name !== "string" ||
            typeof username !== "string" ||
            typeof password !== "string") {
            return res.status(400).json({
                message: "Name, Username, and Password are required",
            });
        };
        const normalizedName = name.trim();
        const normalizedUsername = username.trim().toLowerCase();
        if (!normalizedName || !normalizedUsername || !password.trim()) {
            return res.status(400).json({
                message: "Name, username, and password cannot be empty",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters",
            });
        }

        if (Buffer.byteLength(password, "utf8") > 72) {
            return res.status(400).json({
                message: "Password cannot exceed 72 bytes",
            });
        }

        const usernameExists = await User.exists({
            username: normalizedUsername,
        });

        if (usernameExists) {
            return res.status(409).json({
                message: "Username is already taken",
            });
        }

        const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

        const user = await User.create({
            name: normalizedName,
            username: normalizedUsername,
            passwordHash,
        });

        return res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                profilePicture: user.profilePicture,
                lastSeen: user.lastSeen,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Username is already taken",
            });
        }

        if (error.name === "ValidationError") {
            const firstError = Object.values(error.errors)[0];

            return res.status(400).json({
                message: firstError.message,
            });
        }

        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Unable to create account",
        });

    }
}