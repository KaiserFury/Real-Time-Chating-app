import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No User Token Found",
      });
    }
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(result.userId);
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session",
    });
  }
};


