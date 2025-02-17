import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chatlist from "../components/Chatlist";
import ChatComponent from "../components/ChatComponent";

const ChatPage = () => {
  const endRef = useRef(null);
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded, userId, navigate]);

  return (
    <div className="flex w-full min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed left-1/4 top-1/2 -translate-x-1/4 -translate-y-1/2 w-164 h-128 bg-purple-600/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="fixed left-3/4 top-1/2 -translate-x-3/4 -translate-y-1/2 w-164 h-128 bg-purple-600/20 rounded-full blur-3xl animate-pulse z-0" />

      <Chatlist />

      <main className="flex-1 p-4 sm:p-6 md:p-8 relative z-10 flex flex-col">
        <header className="mb-6 sm:mb-8 md:mb-12 flex flex-col items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent p-2">
            Chat Interface
          </h1>
          <p className="text-[0.65rem] sm:text-xs text-center mt-1 sm:mt-2 text-gray-400">
            Welcome to your AI workspace
          </p>
        </header>

        <div className="flex flex-col flex-grow border border-white/20 bg-gray-950/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 w-full items-center">
          {/* Messages Container */}
          <div className="flex flex-col flex-grow mb-4 overflow-y-auto  w-1/2 border border-white/20 rounded-2xl p-4">
            <div className="flex flex-col space-y-4 flex-grow min-h-[200px] max-h-[400px]">
              {/* Example messages */}
              <p className="p-3 bg-gray-800/70 text-sm sm:text-base rounded-lg max-w-[45%] text-gray-300 mr-auto">
                This is an example message.
              </p>

              <p className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-sm sm:text-base rounded-lg max-w-[45%] ml-auto text-white shadow-md">
                This is a reply.
              </p>

              <p className="p-3 bg-gray-800/70 text-sm sm:text-base rounded-lg max-w-[45%] text-gray-300 mr-auto">
                This is an example message.
              </p>

              <p className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-sm sm:text-base rounded-lg max-w-[45%] ml-auto text-white shadow-md">
                This is a reply.
              </p>
              <p className="p-3 bg-gray-800/70 text-sm sm:text-base rounded-lg max-w-[45%] text-gray-300 mr-auto">
                This is an example message.
              </p>

              <p className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-sm sm:text-base rounded-lg max-w-[45%] ml-auto text-white shadow-md">
                This is a reply.
              </p>
              <p className="p-3 bg-gray-800/70 text-sm sm:text-base rounded-lg max-w-[45%] text-gray-300 mr-auto">
                This is an example message.
              </p>

              <p className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-sm sm:text-base rounded-lg max-w-[45%] ml-auto text-white shadow-md">
                This is a reply.
              </p>
              <p className="p-3 bg-gray-800/70 text-sm sm:text-base rounded-lg max-w-[45%] text-gray-300 mr-auto">
                This is an example message.
              </p>

              <p className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-sm sm:text-base rounded-lg max-w-[45%] ml-auto text-white shadow-md">
                This is a reply.
              </p>
              <p className="p-3 bg-gray-800/70 text-sm sm:text-base rounded-lg max-w-[45%] text-gray-300 mr-auto">
                This is an example message.
              </p>

              <p className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-sm sm:text-base rounded-lg max-w-[45%] ml-auto text-white shadow-md">
                This is a reply.
              </p>

              {/* Add more messages here */}
              <div ref={endRef} className=" p-2" />
            </div>
          </div>

          {/* Chat Input */}
          <ChatComponent />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
