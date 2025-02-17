import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatlist from "../components/Chatlist";
import { FiZap, FiMessageSquare, FiUser } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

const OptionItem = ({ Icon, text }) => (
  <div className="group relative bg-black/30 hover:bg-black/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-purple-500/30 w-full max-w-[200px]">
    <div className="flex flex-col items-center space-y-3">
      <div className="p-2 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 rounded-lg">
        <Icon className="w-6 h-6 text-purple-400 group-hover:text-indigo-300 transition-colors" />
      </div>
      <span className="text-lg font-medium bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-center">
        {text}
        <p className="text-sm font-light text-center mt-1 text-gray-400">
          Start typing!
        </p>
      </span>
    </div>
  </div>
);

const Dashboard = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded, userId, navigate]);

  return (
    <div className="flex w-full min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-156 h-128 bg-purple-600/20 rounded-full blur-xl md:blur-3xl animate-pulse z-0" />
      <Chatlist />

      <main className="flex-1 p-4 sm:p-6 md:p-8 z-10 bg-gray-950 flex flex-col">
        <header className="mb-6 sm:mb-8 md:mb-12 flex flex-col items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent rounded-full border-b border-white  p-2">
            Dashboard
          </h1>
          <p className="text-[0.65rem] sm:text-xs text-center mt-1 sm:mt-2 text-gray-400">
            Welcome to your AI workspace
          </p>
        </header>

        <div className="flex-grow flex flex-col justify-center border border-white/20 bg-gray-950/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 place-items-center flex-grow">
            <OptionItem Icon={FiZap} text="AI Playground" />
            <OptionItem Icon={FiMessageSquare} text="Chat History" />
            <OptionItem Icon={FiUser} text="Profile Settings" />
          </div>

          <div className="relative group w-full max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
            <div className="relative flex items-center bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-2">
              <input
                type="text"
                placeholder="Type something..."
                className="flex-1 bg-transparent px-4 py-3 text-sm placeholder-gray-500 border-none outline-none"
              />
              <button className="ml-2 p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:scale-105 transition-transform">
                <FaArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
