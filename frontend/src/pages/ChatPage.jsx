// ChatPage.tsx
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chatlist from "../components/Chatlist";
import ChatComponent from "../components/ChatComponent";
import Markdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const { id: chatId } = useParams();
  const endRef = useRef(null);
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      axiosInstance.get(`/api/chats/${chatId}`).then((res) => res.data),
    enabled: !!chatId,
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded, userId, navigate, data?.history]);

  useEffect(() => {
    if (data?.error?.status === 404) {
      navigate("/dashboard", { replace: true });
    }
  }, [data, navigate]);

  return (
    <div className="flex w-full min-h-screen bg-black text-white relative overflow-hidden">
      <Chatlist />

      <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 relative z-10 flex flex-col min-w-0">
        <header className="mb-4 sm:mb-6 md:mb-8 flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent p-2">
            Chat Interface
          </h1>
          <p className="text-xs sm:text-sm text-center mt-1 text-gray-400">
            Welcome to your AI workspace
          </p>
        </header>

        <div className="flex flex-col flex-grow border border-white/20 bg-gray-950/50 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 w-full items-center">
          <div className="flex flex-col flex-grow mb-4 overflow-y-auto w-full max-w-screen-md border rounded-2xl py-2 px-4 border-white/10">
            <div className="flex flex-col space-y-4 flex-grow min-h-[300px] sm:min-h-[400px] max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="rounded-full h-8 w-8 border-b-2 border-purple-500" />
                </div>
              ) : error ? (
                <div className="text-red-400 text-center p-4 bg-red-900/20 rounded-lg">
                  {error.message || "Failed to load chat"}
                </div>
              ) : (
                data?.history?.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[85%] md:max-w-[75%] relative ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-green-500 to-green-600 ml-8 rounded-br-none"
                          : "bg-gradient-to-bl from-purple-500/90 to-indigo-500/90 mr-8 rounded-bl-none"
                      }`}
                    >
                      <div className="space-y-2">
                        {message.parts?.map((part, idx) => (
                          <div key={idx} className="break-words">
                            {part.text && (
                              <Markdown className="prose prose-invert text-sm sm:text-base">
                                {part.text}
                              </Markdown>
                            )}
                            {message.img && (
                              <IKImage
                                urlEndpoint={
                                  import.meta.env.VITE_IMAGE_KIT_ENDPOINT
                                }
                                path={message.img.filePath}
                                transformation={[
                                  {
                                    height: 300,
                                    width: 300,
                                    quality: 85,
                                    crop: "maintain_aspect_ratio",
                                  },
                                ]}
                                className={`rounded-lg mt-2 ${
                                  message.role === "user"
                                    ? "ml-auto"
                                    : "mr-auto"
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div
                        className={`absolute bottom-0 w-3 h-3 ${
                          message.role === "user"
                            ? "-right-3 bg-green-500"
                            : "-left-3 bg-purple-500/90"
                        }`}
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                      />
                    </div>
                  </div>
                ))
              )}
              <div ref={endRef} className="pt-4" />
            </div>
          </div>

          <div className="w-full max-w-screen-2xl">
            <ChatComponent chatId={chatId} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
