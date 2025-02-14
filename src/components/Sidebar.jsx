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
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser, // Import useUser hook
} from "@clerk/clerk-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser(); // Get the logged-in user

  return (
    <div className="flex h-screen">
      <div
        className={`flex flex-col p-1 gap-8 items-start bg-gray-100 text-black ${
          isOpen ? "w-32 md:w-48" : "w-12"
        }`}
      >
        <button
          className="w-full transition-all duration-300 hover:bg-purple-500 p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <Link
          to="/"
          className={`w-full transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <FiHome size={22} className="mr-2" />
          <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
        </Link>

        <SignedOut>
          <Link
            to="/signup"
            className={`w-full transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <FiUserPlus size={22} className="mr-2" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Sign up</span>
          </Link>
          <Link
            to="/signin"
            className={`w-full transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
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
            className={`w-full transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <FiHome size={22} className="mr-2" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
          </Link>
          <Link
            to="/dashboard/chats/:id"
            className={`w-full transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <FiMessageSquare size={22} className="mr-2" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Chats</span>
          </Link>

          {/* Display User Button and Name */}
          <div
            className={`mt-auto w-full p-2 flex transition-all duration-300 hover:bg-purple-500 rounded-lg items-center`}
          >
            <UserButton />
            {isOpen && user && (
              <span className="ml-2 font-bold animate-bounce">
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
