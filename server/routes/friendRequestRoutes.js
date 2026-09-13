import express from "express";
import {
  sendFriendRequest,
  getFriendRequests,
  respondToFriendRequest,
  getFriends,
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

router
  .route("/")
  .get(authenticate, getFriends); 

export { router as friendRequestRoute };