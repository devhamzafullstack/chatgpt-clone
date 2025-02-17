import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiZap, FiMessageSquare, FiUser } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import Chatlist from "../components/Chatlist";

const ChatPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded, userId, navigate]);

  return (
    <div className="flex w-full min-h-screen bg-black text-white relative overflow-hidden">
      <Chatlist />
      <main className="flex-1 p-4 sm:p-6 md:p-8 relative z-10 bg-gray-950 flex flex-col">
        <header className="mb-6 sm:mb-8 md:mb-12 flex flex-col items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent rounded-full border-b border-white  p-2">
            Dashboard
          </h1>
          <p className="text-[0.65rem] sm:text-xs text-center mt-1 sm:mt-2 text-gray-400">
            Welcome to your AI workspace
          </p>
        </header>

        <div className="flex-grow flex flex-col items-center justify-center border border-white/20 bg-gray-950/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 w-full">
          <div className="flex-1 h-full rounded-4xl p-4 text-white w-1/2 ">
            <p>Example text</p>
            <p className="text-right">Example text 2</p>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-center items-center bg-white text-black p-1  rounded-xl sm:rounded-2xl w-full max-w-[280px] sm:max-w-md mx-auto">
            <input
              type="text"
              placeholder="Type something..."
              className="bg-transparent w-full rounded-xl sm:rounded-2xl p-1 text-left text-xs sm:text-sm placeholder-gray-500 border-none outline-0"
            />
            <button className="border-dashed border border-black rounded-full hover:scale-110 transition-all duration-300">
              <FaArrowRight className="p-1 text-4xl bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full cursor-pointer hover:scale-90 transition-all duration-300" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
