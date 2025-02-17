import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiPlus,
  FiMessageSquare,
  FiZap,
} from "react-icons/fi";

const ListItem = ({ icon: Icon, text, isCollapsed }) => (
  <li className="flex items-center group hover:bg-white/5 rounded-lg transition-all py-2">
    {isCollapsed ? (
      <Icon className="text-purple-400 w-6 h-6 hover:text-indigo-400 transition-colors" />
    ) : (
      <span className="text-sm sm:text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-clip-text hover:text-transparent">
        {text}
      </span>
    )}
  </li>
);

const Chatlist = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const recentChats = [1, 2, 3, 4, 5];

  return (
    <div
      className={`relative bg-black text-white border-r border-white/10 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-48"
      } flex flex-col h-screen`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-purple-600 rounded-full p-1 z-20 hover:scale-110 transition-transform shadow-lg hover:shadow-purple-600/30"
      >
        {isCollapsed ? (
          <FiChevronRight className="text-white w-5 h-5" />
        ) : (
          <FiChevronLeft className="text-white w-5 h-5" />
        )}
      </button>

      <div className="h-full p-3 overflow-hidden flex flex-col">
        <div className="mb-4">
          <div className="flex items-center h-8">
            {isCollapsed ? (
              <FiGrid className="text-purple-400 w-6 h-6" />
            ) : (
              <span className="text-xs sm:text-sm tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Dashboard
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-4 pb-4 border-b border-white/10">
          <ListItem
            icon={FiGrid}
            text="Explore Next AI"
            isCollapsed={isCollapsed}
          />
          <ListItem
            icon={FiPlus}
            text="Create new chat"
            isCollapsed={isCollapsed}
          />
        </ul>

        {/* Recent Chats */}
        <div className="flex-grow overflow-y-auto mt-4">
          <div className="mb-4">
            <div className="flex items-center h-8">
              {isCollapsed ? (
                <FiGrid className="text-purple-400 w-6 h-6" />
              ) : (
                <span className="text-xs sm:text-sm tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Recent Chats
                </span>
              )}
            </div>
          </div>

          <ul className="space-y-4">
            {recentChats.map((i) => (
              <ListItem
                key={i}
                icon={FiMessageSquare}
                text={`Chat ${i}`}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </div>

        {/* Upgrade Section */}
        <div className="sticky bottom-0 py-4 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-center h-10">
            {isCollapsed ? (
              <FiZap className="text-purple-400 w-6 h-6 hover:text-indigo-400 hover:opacity-80 hover:cursor-pointer transition-all duration-300" />
            ) : (
              <span className="text-xs sm:text-sm font-bold tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent hover:cursor-pointer hover:from-indigo-500 hover:to-purple-500 transition-colors duration-300">
                Upgrade to Premium AI
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
