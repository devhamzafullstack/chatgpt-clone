import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          ref: "Chat",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.UserChats ||
  mongoose.model("UserChats", userChatsSchema);
