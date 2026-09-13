import express from "express";
import {
	createOrFindConversation,
	sendMessage,
	getMessages,
} from "../controllers/messageController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.route("/conversations").post(authenticate, createOrFindConversation);
router.route("/").post(authenticate, sendMessage);
router.route("/:conversationId").get(authenticate, getMessages);

export { router as messageRouter };
