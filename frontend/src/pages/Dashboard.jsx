import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatlist from "../components/Chatlist";
import { FiZap, FiMessageSquare, FiUser } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../lib/axiosInstance";

const OptionItem = ({ Icon, text }) => (
  <div className="group relative bg-black/30 hover:bg-black/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm cursor-pointer w-full max-w-[200px]">
    <div className="flex flex-col items-center space-y-3">
      <div className="p-2 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 rounded-lg">
        <Icon className="w-6 h-6 text-purple-400 group-hover:text-indigo-300" />
      </div>
      <span className="text-lg font-medium bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-center">
        {text}
      </span>
      <p className="text-xs font-light text-center text-gray-400">
        Start typing!
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const submitChat = async () => {
    if (!message.trim()) return;

    try {
      const response = await axiosInstance.post("/api/chats", {
        userId,
        text: message,
      });

      if (response.data.chatId) {
        navigate(`/dashboard/chats/${response.data.chatId}`);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded, userId, navigate]);

  return (
    <div className="flex w-full min-h-screen bg-black text-white overflow-hidden">
      <Chatlist />

      <main className="flex-1 p-2 md:p-8 z-10 flex flex-col bg-transparent overflow-x-hidden min-w-0">
        <header className="mb-6 md:mb-8 flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-center mt-2 text-gray-400">
            Welcome to your AI workspace
          </p>
        </header>

        <div className="flex-grow flex flex-col justify-center border border-white/20 rounded-xl p-2 md:p-6 bg-black/10 backdrop-blur-lg">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 place-items-center flex-grow">
            <OptionItem Icon={FiZap} text="AI Playground" />
            <OptionItem Icon={FiMessageSquare} text="Chat History" />
            <OptionItem Icon={FiUser} text="Profile Settings" />
          </div>

          <div className="relative w-full max-w-2xl mx-auto mt-6 md:mt-8">
            <div className="flex flex-col xs:hidden bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-2">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitChat();
                  }
                }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Title of new chat..."
                className="w-full bg-transparent px-3 py-2 text-sm placeholder-gray-500 border-none outline-none mb-2"
              />
              <button
                onClick={submitChat}
                className="w-full p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
              >
                <span>Continue</span>
                <FaArrowRight className="w-4 h-4 text-white ml-2" />
              </button>
            </div>

            <div className="hidden xs:flex items-center bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-2">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitChat();
                  }
                }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Title of new chat..."
                className="flex-1 bg-transparent px-4 py-2 text-sm placeholder-gray-500 border-none outline-none"
              />
              <button
                onClick={submitChat}
                className="ml-2 p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center space-x-2"
              >
                <span>Continue</span>
                <FaArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
