import User from "../models/User.js";

// GET /api/users?username=...
export const findUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    if (typeof username !== "string" || !username.trim()) {
      return res.status(400).json({ message: "username query parameter is required" });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const user = await User.findOne({ username: normalizedUsername }).select(
      "name username profilePicture"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Find user error:", error);
    return res.status(500).json({ message: "Unable to find user" });
  }
};