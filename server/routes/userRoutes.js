import express from "express";
import { findUserByUsername } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.route("/")
    .get(authenticate, findUserByUsername);

export { router as userRouter };