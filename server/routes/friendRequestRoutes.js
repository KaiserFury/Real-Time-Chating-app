import express from "express";
import {
  sendFriendRequest,
  getFriendRequests,
  respondToFriendRequest,
} from "../controllers/friendRequestController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();



router
  .route("/requests")
  .post(authenticate, sendFriendRequest);

router
  .route("/requests")
  .get(authenticate, getFriendRequests);


router
  .route("/requests/:requestId")
  .patch(authenticate, respondToFriendRequest);

export { router as friendRequestRoute };