import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userchats.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// Add a root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Update API routes to use proper error handling
app.get("/api/upload", (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get authentication parameters" });
  }
});

app.get("/api/userchats", async (req, res) => {
  try {
    const userId = req.query.userId;
    const userChats = await UserChats.find({ userId });
    if (userChats.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(userChats[0].chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user chats" });
  }
});

app.get("/api/chats/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found",
        status: 404,
      });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
});

app.delete("/api/chats/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;

    // Delete from Chats collection
    await Chat.findByIdAndDelete(chatId);

    // Remove from UserChats
    await UserChats.updateOne(
      { "chats._id": chatId },
      { $pull: { chats: { _id: chatId } } }
    );

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

app.post("/api/chats", async (req, res) => {
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newChat = new Chat({
      userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });

    const savedChat = await newChat.save();
    const existingUserChats = await UserChats.findOne({ userId });

    if (!existingUserChats) {
      const newUserChats = new UserChats({
        userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 20),
            createdAt: savedChat.createdAt,
          },
        ],
      });

      await newUserChats.save();
    } else {
      await UserChats.updateOne(
        { userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 20),
              createdAt: savedChat.createdAt,
            },
          },
        }
      );
    }

    res.status(200).json({ chatId: savedChat._id });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/chats/:chatId/messages", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { role, text, img } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    // Format message to match schema structure
    const newMessage = {
      role,
      parts: [{ text }], // Ensure text is wrapped in parts array as per schema
    };

    if (img) {
      newMessage.img = img;
    }

    chat.history.push(newMessage);
    await chat.save();

    if (!chat.title) {
      await UserChats.updateOne(
        { "chats._id": chatId },
        { $set: { "chats.$.title": text.substring(0, 20) } }
      );
      chat.title = text.substring(0, 20);
      await chat.save();
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    code: 500,
    message: "Internal server error",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
