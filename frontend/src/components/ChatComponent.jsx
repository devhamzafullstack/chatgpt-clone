import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

const ChatComponent = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: null,
    aiData: null,
  });
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async ({ text, role = "user" }) => {
      try {
        const messageData = {
          role: role === "model" ? "ai" : role,
          text,
          ...(img.dbData ? { img: img.dbData } : {}),
        };

        const response = await axiosInstance.post(
          `/api/chats/${chatId}/messages`,
          messageData
        );
        return response.data;
      } catch (error) {
        console.error("Detailed error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chat", chatId]);
    },
  });

  const handleSendMessage = async () => {
    if (!message.trim() || isProcessing) return;
    setIsProcessing(true);

    const currentMessage = message;
    const currentImgData = img.aiData;
    const currentDbData = img.dbData;

    setMessage("");
    setImg({ isLoading: false, error: "", dbData: null, aiData: null });

    try {
      await sendMessageMutation.mutateAsync({
        text: currentMessage,
        ...(currentDbData ? { img: currentDbData } : {}),
      });

      const chatHistory =
        queryClient.getQueryData(["chat", chatId])?.history || [];
      const history = chatHistory.map((msg) => ({
        role: msg.role === "ai" ? "model" : "user",
        parts: msg.parts.map((part) =>
          part.text ? { text: part.text } : part
        ),
      }));

      const parts = [];
      if (currentImgData) parts.push(currentImgData);
      parts.push({ text: currentMessage });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(parts);
      const aiResponse = result.response;

      await sendMessageMutation.mutateAsync({
        text: aiResponse.text(),
        role: "ai",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full mt-4 px-2 sm:px-4">
      <div className="relative group w-full max-w-4xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-indigo-600/50 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300" />

        {img.isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
          </div>
        )}

        {img.dbData && img.dbData.filePath && (
          <div className="mb-4 max-w-[200px] mx-auto">
            <IKImage
              urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
              path={img.dbData.filePath}
              transformation={[
                {
                  quality: 85,
                },
              ]}
              loading="lazy"
              lqip={{ active: true }}
              className="rounded-lg w-full h-auto max-h-[400px] object-contain"
            />
          </div>
        )}
        <div className="relative flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-2 sm:p-3">
          <div className="flex w-full items-center gap-2 ">
            <Upload setImg={setImg} />
            <input
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 bg-transparent  py-2 text-sm sm:text-base placeholder-gray-400 border-none outline-none text-white w-full sm:min-w-[100px] max-w-[100px] sm:max-w-full"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={sendMessageMutation.isLoading || isProcessing}
            className={`w-full sm:w-auto ml-auto p-2 sm:p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 ${
              sendMessageMutation.isLoading || isProcessing ? "opacity-70" : ""
            }`}
          >
            {
              <span className="hidden sm:inline-block text-sm font-medium">
                Send
              </span>
            }
            {sendMessageMutation.isLoading || isProcessing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
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
