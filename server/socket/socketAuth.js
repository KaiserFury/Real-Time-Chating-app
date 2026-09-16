import jwt from "jsonwebtoken";
import { parseCookie } from "cookie";
import User from "../models/User.js";

export async function socketAuthMiddleware(socket, next) {
  try {
    const rawCookies = socket.handshake.headers.cookie;

    if (!rawCookies) {
      return next(new Error("Authentication required"));
    }

    const parsedCookies = parseCookie(rawCookies);
    const token = parsedCookies.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.id || decoded._id;
    const user = await User.findById(userId).select("-passwordHash");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
}