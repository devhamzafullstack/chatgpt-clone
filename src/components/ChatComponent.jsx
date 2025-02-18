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
  });
  const [loadingAI, setLoadingAI] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Send message to AI model
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoadingAI(true);
    // Add user message to state
    setMessages((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const result = await model.generateContent(
        `Keep it under 75 words, format your response to make it readable , use markdown if possible (like bullet points): ${message}`
      );
      const response = await result.response;
      const text = response.text();

      // Add AI response to state
      setMessages((prev) => [...prev, { sender: "ai", text }]);
    } catch (error) {
      console.error("AI response failed:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Failed to get a response from AI." },
      ]);
    } finally {
      setLoadingAI(false);
    }

    setMessage(""); // Clear input
  };

  return (
    <div className="w-full mt-4 px-2 sm:px-4">
      <div className="relative group w-full max-w-4xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />

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
