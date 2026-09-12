import "dotenv/config";   // ← loads .env immediately, as a side effect of the import itself

import express from "express";
import connectDatabase from "./config/database.js";
import { registerRoute } from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { friendRequestRoute } from "./routes/friendRequestRoutes.js";



const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // Required so the browser accepts and sends the auth cookie across ports.
    credentials: true,
  }),
);

app.use(express.json());
// Makes incoming Cookie headers available through req.cookies for auth middleware.
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Chat server is running. ",
  });
});

app.use("/api/auth", registerRoute);
app.use("/api/friends", friendRequestRoute);

const startServer = async () => {
  // Start listening only after MongoDB is ready, so routes can safely query data.
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
};

startServer();
