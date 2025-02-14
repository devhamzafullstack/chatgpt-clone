import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col justify-between w-full overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed -top-64  -left-64 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300" />
      <div className="fixed -bottom-64  -right-64 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Content Container */}
      <div className="flex flex-col flex-grow z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-4 md:mb-8">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            AI Chat
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-grow text-center space-y-12 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold px-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent block mb-2 sm:mb-4">
              Next-Gen
            </span>
            <span className="block text-sm sm:text-base md:text-xl animate-fade-in-up delay-100">
              AI Conversations
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4 animate-fade-in-up delay-200">
            Harness the power of advanced AI for code generation, creative
            writing, and intelligent problem solving.
          </p>

          <Link
            to="/signup"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl 
            text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg 
            hover:shadow-purple-600/20 animate-fade-in-up delay-300"
          >
            Get Started
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 border-t border-white/10 pt-4 sm:pt-8 mt-8 sm:mt-16">
          <p className="text-xs sm:text-sm">
            © 2025 AI Chat. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
