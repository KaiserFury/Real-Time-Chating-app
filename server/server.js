// server.js
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDatabase from "./config/database.js";
import { registerRoute } from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { friendRequestRoute } from "./routes/friendRequestRoutes.js";
import { messageRouter } from "./routes/messageRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { socketAuthMiddleware } from "./socket/socketAuth.js";
import { registerSocketHandlers } from "./socket/socketHandlers.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Reliable __dirname in ESM — based on this file's own location,
// not whatever directory node happened to be launched from.
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Health check moved off "/" so it doesn't shadow the frontend.
app.get("/api/health", (req, res) => {
  res.json({ message: "Chat server is running." });
});

app.use("/api/auth", registerRoute);
app.use("/api/friends", friendRequestRoute);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

// Serve the built frontend.
app.use(express.static(path.join(_dirname, "..", "client", "dist")));

// Catch-all fallback so client-side routing (React Router etc.) still
// works on refresh/direct navigation. app.use with no path here avoids
// Express 5's wildcard/path-to-regexp changes entirely.
app.use((req, res) => {
  res.sendFile(path.join(_dirname,"..", "client", "dist", "index.html"));
});

// Wrap Express in a raw HTTP server so Socket.IO can attach to the same port.
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  registerSocketHandlers(io, socket);
});

const startServer = async () => {
  await connectDatabase();
  httpServer.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
};

startServer();