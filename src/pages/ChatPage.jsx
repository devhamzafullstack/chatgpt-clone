import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatlist from "../components/Chatlist";
import ChatComponent from "../components/ChatComponent";
import Markdown from "react-markdown";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chat/${userId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const endRef = useRef(null);
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Store chat messages

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded, userId, navigate, messages]);

  return (
    <div className="flex w-full min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed left-1/4 top-1/2 -translate-x-1/4 -translate-y-1/2 w-32 md:w-164 h-32 md:h-128 bg-purple-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="fixed left-3/4 top-1/2 -translate-x-3/4 -translate-y-1/2 w-32 md:w-164 h-32 md:h-128 bg-purple-600/20 rounded-full blur-3xl animate-pulse z-0" />

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
            <div className="flex flex-col space-y-3 flex-grow min-h-[300px] sm:min-h-[400px] max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
              {messages.map((msg, index) => (
                <Markdown
                  key={index}
                  className={`p-2 sm:p-3 rounded-lg max-w-full sm:max-w-[80%] md:max-w-[70%] ${
                    msg.sender === "ai"
                      ? "bg-gray-800/70 text-gray-300 mr-auto"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 text-white ml-auto shadow-md"
                  }`}
                >
                  {msg.text}
                </Markdown>
              ))}

              <div ref={endRef} className="p-1 sm:p-2" />
            </div>
          </div>

          <div className="w-full max-w-screen-2xl">
            <ChatComponent messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
