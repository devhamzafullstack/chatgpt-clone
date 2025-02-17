import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatlist from "../components/Chatlist";
import { FiZap, FiMessageSquare, FiUser } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

const OptionItem = ({ Icon, text }) => (
  <div className="group relative bg-black/30 hover:bg-black/50 p-2 sm:p-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-purple-500/30 w-full max-w-[150px] sm:max-w-[200px]">
    <div className="flex flex-col items-center space-y-1 sm:space-y-3">
      <div className="p-1 sm:p-2 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 rounded-lg">
        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400 group-hover:text-indigo-300 transition-colors" />
      </div>
      <span className="text-sm sm:text-lg font-medium bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent text-center">
        {text}
        <p className="text-xs sm:text-sm font-light text-center mt-0.5 sm:mt-1 text-gray-400">
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
      {/* Mobile-optimized background */}
      <div className="fixed left-1/2 top-1/2 -translate-x-[45%] -translate-y-[40%] w-[200px] h-[200px] sm:w-164 sm:h-128 bg-purple-600/20 rounded-full blur-[50px] sm:blur-[100px] animate-pulse z-0" />

      <Chatlist />

      <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 z-10 flex flex-col bg-transparent">
        <header className="mb-4 sm:mb-6 md:mb-8 flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent p-1 sm:p-2">
            Dashboard
          </h1>
          <p className="text-[0.6rem] xs:text-xs sm:text-sm text-center mt-0.5 sm:mt-1 text-gray-400">
            Welcome to your AI workspace
          </p>
        </header>

        <div className="flex-grow flex flex-col justify-center border border-white/20  rounded-lg sm:rounded-xl md:rounded-2xl p-4  lg:p-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 place-items-center flex-grow">
            <OptionItem Icon={FiZap} text="AI Playground" />
            <OptionItem Icon={FiMessageSquare} text="Chat History" />
            <OptionItem Icon={FiUser} text="Profile Settings" />
          </div>

          <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-4 sm:mt-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
            <div className="relative flex items-center bg-black/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 p-1 sm:p-2">
              <input
                type="text"
                placeholder="Type something..."
                className="flex-1 bg-transparent px-2 sm:px-4 py-1 sm:py-2 md:py-3 text-xs sm:text-sm placeholder-gray-500 border-none outline-none"
              />
              <button className="ml-1 sm:ml-2 p-1 sm:p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md sm:rounded-lg hover:scale-105 transition-transform">
                <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
