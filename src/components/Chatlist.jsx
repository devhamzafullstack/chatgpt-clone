import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiPlus,
  FiMessageSquare,
  FiZap,
} from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const ListItem = ({ icon: Icon, text, isCollapsed }) => (
  <li className="flex items-center group hover:bg-white/5 rounded-lg transition-all  mt-2  py-1.5 sm:py-2 md:py-2.5 mb-4">
    {isCollapsed ? (
      <Icon className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hover:text-indigo-400 transition-colors " />
    ) : (
      <span className="text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-clip-text hover:text-transparent line-clamp-1">
        {text}
      </span>
    )}
  </li>
);

const Chatlist = () => {
  const { userId } = useAuth();
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats?userId=${userId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`relative bg-black text-white border-r border-white/10 transition-all duration-300 ${
        isCollapsed ? "w-12 sm:w-14 md:w-16" : "w-40 sm:w-48 md:w-56 lg:w-64"
      } flex flex-col h-screen`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 sm:-right-4 top-3 bg-purple-600 rounded-full p-1 sm:p-1.5 z-20 hover:scale-110 transition-transform shadow-lg hover:shadow-purple-600/30"
      >
        {isCollapsed ? (
          <FiChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <FiChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>

      <div className="h-full p-2 sm:p-3 overflow-hidden flex flex-col">
        <div className="mb-2 sm:mb-5">
          <div className="flex items-center h-6 sm:h-7 md:h-8">
            {isCollapsed ? (
              <FiGrid className="text-purple-400 w-4 h-4 md:w-6 md:h-6 mt-2  " />
            ) : (
              <span className="text-xs sm:text-sm md:text-base tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                Dashboard
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-2 sm:space-y-3 md:space-y-4 pb-3 sm:pb-4 border-b border-white/10">
          <ListItem
            icon={FiPlus}
            text="Create new chat"
            isCollapsed={isCollapsed}
          />
        </ul>

        {/* Recent Chats */}
        <div className="flex-grow overflow-y-auto mt-3 sm:mt-4">
          <div className="mb-2 sm:mb-3 md:mb-4">
            <div className="flex items-center ">
              {isCollapsed ? (
                <FiGrid className="text-purple-400 w-4 h-4 mt-4 mb-3 md:w-6 md:h-6" />
              ) : (
                <span className="text-xs sm:text-sm md:text-base tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                  Recent Chats
                </span>
              )}
            </div>
          </div>
          <ul className="space-y-2 sm:space-y-3 md:space-y-4">
            {isLoading ? (
              <p>Loading chats...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              data?.map((chat) => (
                <Link
                  key={chat._id}
                  to={`/dashboard/chats/${chat._id}`}
                  className="block"
                >
                  <ListItem
                    icon={FiMessageSquare}
                    text={chat.title}
                    isCollapsed={isCollapsed}
                  />
                </Link>
              ))
            )}
          </ul>
        </div>

        {/* Upgrade Section */}
        <div className="sticky bottom-0 py-2 sm:py-3 md:py-4 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-center h-8 sm:h-9 md:h-10">
            {isCollapsed ? (
              <FiZap className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hover:text-indigo-400 hover:opacity-80 hover:cursor-pointer transition-all duration-300" />
            ) : (
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent hover:cursor-pointer hover:from-indigo-500 hover:to-purple-500 transition-colors duration-300">
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
