import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUserPlus,
  FiLogIn,
  FiMessageSquare,
  FiHome,
} from "react-icons/fi";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex h-screen transition-all duration-300">
      <div
        className={`transition-all duration-300 flex flex-col p-1 gap-4 items-start bg-black text-white border-r border-white/10 ${
          isOpen ? "w-48" : "w-12"
        }`}
      >
        <button
          className="w-full transition-all duration-300 hover:bg-purple-500/20 p-2 rounded-lg text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <Link
          to="/"
          className={`w-full transition-all duration-300 hover:bg-purple-500/20 rounded-lg p-2 flex items-center text-white ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <FiHome size={22} className="mr-2" />
          <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
        </Link>

        <SignedOut>
          <Link
            to="/signup"
            className={`w-full transition-all duration-300 hover:bg-purple-500/20 rounded-lg p-2 flex items-center text-white ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <FiUserPlus size={22} className="mr-2" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Sign up</span>
          </Link>
          <Link
            to="/signin"
            className={`w-full transition-all duration-300 hover:bg-purple-500/20 rounded-lg p-2 flex items-center text-white ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <FiLogIn size={22} className="mr-2" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Sign in</span>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link
            to="/dashboard"
            className={`w-full transition-all duration-300 hover:bg-purple-500/20 rounded-lg p-2 flex items-center text-white ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <MdDashboard size={22} className="mr-2" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
          </Link>

          <div
            className={`mt-auto w-full  p-1 flex transition-all duration-300 hover:bg-purple-500/20 rounded-full items-center text-white animate-pulse2 mb-1`}
          >
            <div className="border border-white rounded-lg">
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: "text-white",
                  },
                }}
              />
            </div>
            {isOpen && user && (
              <span className="ml-2 font-medium text-sm text-white">
                {user.fullName}
              </span>
            )}
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Sidebar;
