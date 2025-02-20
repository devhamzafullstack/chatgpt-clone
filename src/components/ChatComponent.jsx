import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import Markdown from "react-markdown";

const ChatComponent = ({ messages, setMessages }) => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: null,
    aiData: null,
  });
  const [loadingAI, setLoadingAI] = useState(false);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const [chat] = useState(() =>
    model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    })
  );

  // Send message with streaming support
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoadingAI(true);

    // Add user message
    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Create message parts
      const parts = [];
      if (img.aiData) parts.push(img.aiData);
      parts.push({ text: message });

      // Stream response
      const result = await chat.sendMessageStream(parts);
      let accumulatedText = "";

      // Add initial AI message
      setMessages((prev) => [...prev, { sender: "ai", text: "..." }]);

      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        accumulatedText += chunkText;

        // Update last message incrementally
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = accumulatedText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("AI response failed:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Failed to get a response from AI." },
      ]);
    } finally {
      setLoadingAI(false);
    }

    setMessage("");
    setImg({ isLoading: false, error: "", dbData: null, aiData: null });
  };

  return (
    <div className="w-full mt-4 px-2 sm:px-4">
      <div className="relative group w-full max-w-4xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-indigo-600/50 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300" />

        {/* Image Loading Spinner */}
        {img.isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
          </div>
        )}

        {/* Uploaded Image Display */}
        {img.dbData && img.dbData.filePath && (
          <div className="mb-4">
            <IKImage
              urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
              path={img.dbData.filePath}
              transformation={[
                {
                  height: 300,
                  width: 300,
                  quality: 85,
                  crop: "maintain_aspect_ratio",
                },
              ]}
              loading="lazy"
              lqip={{ active: true }}
              className="rounded-lg w-full max-w-[400px] mx-auto"
            />
          </div>
        )}

        {/* Chat Input */}
        <div className="relative flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-2 sm:p-3">
          <div className="flex w-full  items-center gap-2">
            <Upload setImg={setImg} />
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1 bg-transparent px-3 sm:px-4 py-2 text-sm sm:text-base placeholder-gray-400 border-none outline-none text-white w-full min-w-[150px]"
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={loadingAI}
            className="w-full sm:w-auto ml-auto p-2 sm:p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
          >
            <span className="hidden sm:inline-block text-sm font-medium">
              Send
            </span>
            {loadingAI ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              </>
            ) : (
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </button>
        </div>

        {img.error && (
          <p className="text-red-400 text-xs sm:text-sm mt-2 text-center">
            {img.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
