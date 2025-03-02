import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import axiosInstance from "../lib/axiosInstance";
const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col justify-between w-full overflow-hidden">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/3 -translate-y-1/2 w-156 h-128 bg-purple-600/20 rounded-full blur-xl md:blur-3xl animate-pulse z-0" />

      <div className="flex flex-col flex-grow z-10">
        <nav className="flex justify-between items-center mb-4 md:mb-8">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent p-2 rounded-2xl border-b border-white">
            Next AI
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center flex-grow text-center space-y-12 sm:space-y-8  rounded-2xl">
          <h1 className="text-3xl sm:text-6xl lg:text-8xl font-bold px-4">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent block mb-2 sm:mb-4 opacity-0 animate-fade-in-up ">
              Next AI
            </span>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "AI Chat made with React.",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "AI Chat made with Node.js.",
                1000,
                "AI Chat made with Express.js.",
                1000,
                "AI Chat made with MongoDB.",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: ".4em", display: "inline-block" }}
              repeat={Infinity}
              className="block text-sm sm:text-base md:text-xl opacity-0 animate-fade-in-up delay-100"
            />
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-400 mx-auto px-4 opacity-0 animate-fade-in-up delay-200 max-w-md">
            Harness the power of advanced AI for code generation, creative
            writing and more.
          </p>

          <Link
            to="/signup"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl 
            text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg 
            hover:shadow-purple-600/20 opacity-0 animate-fade-in-up"
          >
            Get Started
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 border-t border-white/10 pt-4 sm:pt-8 mt-8 sm:mt-16">
          <p className="text-xs sm:text-sm font-semibold">Hamza Khan</p>
          <p className="text-xs sm:text-sm">
            © 2025 AI Chat. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
