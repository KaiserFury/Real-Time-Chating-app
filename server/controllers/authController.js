import bcrypt from "bcrypt";
import User, { usernamePattern } from "../models/User.js";

const BCRYPT_ROUNDS = 12;

export const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (
            typeof name !== "string" ||
            typeof username !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Name, Username, and Password are required",
            });
        }
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
};

export const checkUsername = async (req, res) => {
    try {
        const { username } = req.query;
        if (typeof username !== "string") {
            return res.status(400).json({
                message: "Username is required",
            });
        }

        const normalizedUsername = username.trim().toLowerCase();

        if (normalizedUsername.length < 3) {
            return res.status(400).json({
                message: "Username must contain at least 3 characters",
            });
        }
        if (normalizedUsername.length > 20) {
            return res.status(400).json({
                message: "Username cannot exceed 20 characters",
            });
        }

        if (!usernamePattern.test(normalizedUsername)) {
            return res.status(400).json({
                message:
                    "Username can only contain lowercase letters, numbers, periods, and underscores",
            });
        }
        const usernameExists = await User.exists({
            username: normalizedUsername,
        });

        if (usernameExists) {
            return res.status(200).json({
                message: "Username is already taken",
                username: normalizedUsername,
                available: false,
            });
        } else {
            return res.status(200).json({
                message: "Username is available",
                username: normalizedUsername,
                available: true,
            });
        }
    } catch (error) {
        console.error("Username availability error:", error);

        return res.status(500).json({
            message: "Unable to check username availability",
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Username and Password are required",
            });
        }

        const normalizedUsername = username.trim().toLowerCase();

        if (!normalizedUsername || !password.trim()) {
            return res.status(400).json({
                message: "Username and password cannot be empty",
            });
        }

        const userDetail = await User.findOne({
            username: normalizedUsername,
        }).select("+passwordHash");

        if (!userDetail) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetail.passwordHash,
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: userDetail._id,
                name: userDetail.name,
                username: userDetail.username,
                profilePicture: userDetail.profilePicture,
                lastSeen: userDetail.lastSeen,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Unable to log in",
        });
    }
};
