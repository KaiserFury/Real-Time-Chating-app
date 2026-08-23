import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import {registerRoute} from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
// Makes incoming Cookie headers available through req.cookies for auth middleware.
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "Chat server is running. ",
    });
});

app.use("/api/auth", registerRoute);

const startServer = async ()=> {
    await connectDatabase();
    app.listen( PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
};

startServer();
