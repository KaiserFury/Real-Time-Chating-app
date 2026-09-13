import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

// Two users can only message each other if there's an accepted
// friend request between them, in either direction.
async function areFriends(userIdA, userIdB) {
  const accepted = await FriendRequest.exists({
    status: "accepted",
    $or: [
      { sender: userIdA, receiver: userIdB },
      { sender: userIdB, receiver: userIdA },
    ],
  });
  return Boolean(accepted);
}

// POST /api/messages/conversations
// body: { participantId }
export const createOrFindConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { participantId } = req.body;

    if (!participantId || !mongoose.Types.ObjectId.isValid(participantId)) {
      return res.status(400).json({ message: "A valid participantId is required" });
    }

    if (participantId.toString() === userId.toString()) {
      return res.status(400).json({ message: "You cannot start a conversation with yourself" });
    }

    const otherUserExists = await User.exists({ _id: participantId });
    if (!otherUserExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const friends = await areFriends(userId, participantId);
    if (!friends) {
      return res.status(403).json({
        message: "You can only message users you have an accepted friend request with",
      });
    }

    const [first, second] = [userId.toString(), participantId.toString()].sort();
    const conversationKey = `${first}:${second}`;

    let conversation = await Conversation.findOne({ conversationKey });

    // Recover conversations created before conversationKey was introduced.
    if (!conversation) {
      conversation = await Conversation.findOne({
        participants: { $all: [userId, participantId], $size: 2 },
      });

      if (conversation) {
        conversation.conversationKey = conversationKey;
        await conversation.save();
      }
    }

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [first, second],
        conversationKey,
      });
    }

    return res.status(200).json({ conversation });
  } catch (error) {
    console.error("Create/find conversation error:", error);
    return res.status(500).json({ message: "Unable to create or find conversation" });
  }
};

// POST /api/messages
// body: { conversationId, text }
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { conversationId, text } = req.body;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "A valid conversationId is required" });
    }

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ message: "Message text cannot be empty" });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === senderId.toString()
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "You are not a participant in this conversation" });
    }

    // Re-check friendship at send time, not just at conversation creation —
    // covers the case where a friend was later removed/unfriended (once that exists).
    const otherParticipantId = conversation.participants.find(
      (p) => p.toString() !== senderId.toString()
    );
    const friends = await areFriends(senderId, otherParticipantId);
    if (!friends) {
      return res.status(403).json({
        message: "You can only message users you have an accepted friend request with",
      });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text: text.trim(),
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({ message: "Unable to send message" });
  }
};

// GET /api/messages/:conversationId?page=1&limit=20
export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Invalid conversationId" });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId.toString()
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "You are not a participant in this conversation" });
    }

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100); // cap to avoid abuse
    const skip = (page - 1) * limit;

    // Newest first, then reversed so the client can render top-to-bottom
    const messages = await Message.find({ conversation: conversationId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name username profilePicture");

    return res.status(200).json({
      messages: messages.reverse(),
      page,
      limit,
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({ message: "Unable to fetch messages" });
  }
};