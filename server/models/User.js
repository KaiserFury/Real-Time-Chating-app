import mongoose from "mongoose";

export const usernamePattern = /^[a-z0-9._]+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must contain at least 3 characters"],
      maxlength: [20, "Username cannot exceed 20 characters"],
      match: [
        usernamePattern,
        "Username can only contain lowercase letters, numbers, periods, and underscores",
      ],
    },

    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      // Keep hashes out of normal queries; login explicitly selects this field.
      select: false,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    lastSeen: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
