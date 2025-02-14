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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`flex flex-col p-1 gap-8 itsems-start bg-gray-100 text-black ${
          isOpen ? "w-32 md:w-48" : "w-12"
        }`}
      >
        <button
          className="transition-all duration-300 hover:bg-purple-500 p-2 rounded-lg "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <Link
          to="/"
          className={`transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <FiHome size={22} className="mr-2" />
          <span className={`${isOpen ? "block" : "hidden"} `}>Home</span>
        </Link>

        <Link
          to="/signup"
          className={`transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <FiUserPlus size={22} className="mr-2" />
          <span className={`${isOpen ? "block" : "hidden"} `}>Sign up</span>
        </Link>
        <Link
          to="/signin"
          className={`transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <FiLogIn size={22} className="mr-2" />
          <span className={`${isOpen ? "block" : "hidden"} `}>Sign in</span>
        </Link>
        <Link
          to="/dashboard/chats/:id"
          className={`transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <FiMessageSquare size={22} className="mr-2" />
          <span className={`${isOpen ? "block" : "hidden"} `}>Chat</span>
        </Link>
        <Link
          to="/dashboard"
          className={`transition-all duration-300 hover:bg-purple-500 rounded-lg p-2 flex ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <FiHome size={22} className="mr-2" />
          <span className={`${isOpen ? "block" : "hidden"} `}>Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
