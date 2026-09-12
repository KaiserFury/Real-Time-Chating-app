import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Prevents duplicate pending requests while allowing a later request after rejection.
friendRequestSchema.index(
  { sender: 1, receiver: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } },
);

export default mongoose.model("FriendRequest", friendRequestSchema);
