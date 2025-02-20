import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "ai"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],
        img: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
