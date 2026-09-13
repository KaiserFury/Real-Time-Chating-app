import mongoose from "mongoose";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

// POST /api/friends/requests
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id; // never trust a client-supplied sender ID
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "receiverId is required" });
    }

    if (!mongoose.isValidObjectId(receiverId)) {
      return res.status(400).json({ message: "receiverId must be a valid user ID" });
    }

    if (receiverId.toString() === senderId.toString()) {
      return res.status(400).json({
        message: "You cannot send a friend request to yourself",
      });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Block pending requests and prevent a new request after acceptance.
    const existingRequest = await FriendRequest.findOne({
      status: { $in: ["pending", "accepted"] },
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(409).json({
        message:
          existingRequest.status === "accepted"
            ? "These users are already friends"
            : "A pending friend request already exists between these users",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    return res.status(201).json({ friendRequest });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A friend request already exists between these users",
      });
    }
    console.error("Send friend request error:", error);
    return res.status(500).json({ message: "Unable to send friend request" });
  }
};

// GET /api/friends/requests
// Pending requests sent TO the current user by default.
// ?type=sent returns pending requests the current user has sent instead.
export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;

    const filter =
      type === "sent"
        ? { sender: userId, status: "pending" }
        : { receiver: userId, status: "pending" };

    const requests = await FriendRequest.find(filter)
      .populate("sender", "name username profilePicture")
      .populate("receiver", "name username profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error("Get friend requests error:", error);
    return res.status(500).json({ message: "Unable to fetch friend requests" });
  }
};

// PATCH /api/friends/requests/:requestId
export const respondToFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { requestId } = req.params;
    const { status } = req.body; // "accepted" or "rejected"

    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({ message: "requestId must be valid" });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "status must be 'accepted' or 'rejected'",
      });
    }

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.receiver.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Only the receiver can respond to this request",
      });
    }

    if (friendRequest.status !== "pending") {
      return res.status(409).json({
        message: "This request has already been responded to",
      });
    }

    friendRequest.status = status;
    await friendRequest.save();

    return res.status(200).json({ friendRequest });
  } catch (error) {
    console.error("Respond to friend request error:", error);
    return res.status(500).json({ message: "Unable to update friend request" });
  }
};

// GET /api/friends
// Returns the current user's accepted friends (the *other* user in each
// accepted FriendRequest, not the request documents themselves).
export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const acceptedRequests = await FriendRequest.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name username profilePicture")
      .populate("receiver", "name username profilePicture");

    // Each accepted request has the current user on one side — pick the *other* side.
    const friends = acceptedRequests.map((request) => {
      const isSender = request.sender._id.toString() === userId.toString();
      return isSender ? request.receiver : request.sender;
    });

    return res.status(200).json({ friends });
  } catch (error) {
    console.error("Get friends error:", error);
    return res.status(500).json({ message: "Unable to fetch friends" });
  }
};