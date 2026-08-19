import express from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Chat server is running. ",
    });
});

app.listen(PORT, () => {
    console.log(" server is running on http://localhost:8000");
});