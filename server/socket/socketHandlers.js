import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import FriendRequest from "../models/FriendRequest.js";

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

export function registerSocketHandlers(io, socket) {
  const userId = socket.user._id.toString();

  // Personal room — lets you push events to this user regardless of which
  // conversation they're currently viewing (e.g. "new friend request" later).
  socket.join(`user:${userId}`);

  console.log(`Socket connected: ${socket.user.username} (${socket.id})`);

  // Client asks to join a specific conversation's room before sending/receiving
  // messages in it — verifies membership server-side, never trusts the client.
  socket.on("joinConversation", async (conversationId) => {
    try {
      const conversation = await Conversation.findById(conversationId);

      if (!conversation) {
        return socket.emit("error", { message: "Conversation not found" });
      }

      const isParticipant = conversation.participants.some(
        (p) => p.toString() === userId
      );

      if (!isParticipant) {
        return socket.emit("error", { message: "Not a participant in this conversation" });
      }

      socket.join(`conversation:${conversationId}`);
    } catch (error) {
      socket.emit("error", { message: "Failed to join conversation" });
    }
  });

  socket.on("leaveConversation", (conversationId) => {
    socket.leave(`conversation:${conversationId}`);
  });

  // Mirrors your REST sendMessage controller's validation exactly — the
  // socket path must enforce the same rules, not just trust the client.
  socket.on("sendMessage", async ({ conversationId, text }, callback) => {
    try {
      if (typeof text !== "string" || !text.trim()) {
        return callback?.({ error: "Message text cannot be empty" });
      }

      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return callback?.({ error: "Conversation not found" });
      }

      const isParticipant = conversation.participants.some(
        (p) => p.toString() === userId
      );
      if (!isParticipant) {
        return callback?.({ error: "Not a participant in this conversation" });
      }

      const otherParticipantId = conversation.participants.find(
        (p) => p.toString() !== userId
      );
      const friends = await areFriends(userId, otherParticipantId);
      if (!friends) {
        return callback?.({ error: "You can only message accepted friends" });
      }

      // Persist first — this is the "save before emit" requirement, so a
      // message is never broadcast unless it's already safely in the DB.
      const message = await Message.create({
        conversation: conversationId,
        sender: userId,
        text: text.trim(),
      });

      const populatedMessage = await message.populate(
        "sender",
        "name username profilePicture"
      );

      // Only sockets that joined this conversation's room receive it —
      // satisfies "only participants receive that room's events."
      io.to(`conversation:${conversationId}`).emit("newMessage", populatedMessage);

      callback?.({ success: true, message: populatedMessage });
    } catch (error) {
      console.error("Socket sendMessage error:", error);
      callback?.({ error: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.user.username} (${socket.id})`);
  });
}