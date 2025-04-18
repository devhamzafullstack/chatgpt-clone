import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ListItem = ({ icon: Icon, text, isCollapsed }) => (
  <li className="flex items-center group hover:bg-white/5 rounded-lg transition-all mt-2 py-1.5 sm:py-2 md:py-2.5 mb-4 relative">
    <div className="flex items-center">
      {isCollapsed ? (
        <Icon className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hover:text-indigo-400 transition-colors" />
      ) : (
        <span className="text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-clip-text hover:text-transparent line-clamp-1">
          {text}
        </span>
      )}
    </div>
  </li>
);

const Chatlist = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { isLoading, error, data } = useQuery({
    queryKey: ["userChats", userId],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/userchats?userId=${userId}`)
        .then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (chatId) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${userId}` },
      }),

    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries(["userChats", userId]);
   
      const currentChatId = window.location.pathname.split("/").pop();
      if (currentChatId === chatId) {
        navigate("/dashboard", { replace: true });
      }
    },
  });

  const handleDelete = (chatId, e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteMutation.mutate(chatId);
    }
  };


  const chats = Array.isArray(data) ? data : data?.chats || [];

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
              <FiGrid className="text-purple-400 w-4 h-4 md:w-6 md:h-6 mt-2" />
            ) : (
              <span className="text-xs sm:text-sm md:text-base tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                Dashboard
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-2 sm:space-y-3 md:space-y-4 pb-3 sm:pb-4 border-b border-white/10">
          <Link to="/dashboard">
            <ListItem
              icon={FiPlus}
              text="Create new chat"
              isCollapsed={isCollapsed}
            />
          </Link>
        </ul>

       
        <div className="flex-grow overflow-y-auto mt-3 sm:mt-4">
          <div className="mb-2 sm:mb-3 md:mb-4">
            <div className="flex items-center">
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
              <p className="text-gray-400 text-xs">Loading chats...</p>
            ) : error ? (
              <p className="text-red-400 text-xs">Error loading chats</p>
            ) : (
              chats.map((chat) => (
                <div key={chat._id} className="group relative">
                  <Link
                    to={`/dashboard/chats/${chat._id}`}
                    className="block hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ListItem
                      icon={FiMessageSquare}
                      text={chat.title}
                      isCollapsed={isCollapsed}
                    />
                  </Link>
                  {!isCollapsed && (
                    <button
                      onClick={(e) => handleDelete(chat._id, e)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100  p-1 bg-red-500 rounded-full h-5 w-5 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))
            )}
          </ul>
        </div>

     
        <div className="sticky bottom-0 py-2 sm:py-3 md:py-4 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-center h-8 sm:h-9 md:h-10">
            {isCollapsed ? (
              <FiZap className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 hover:text-indigo-400 hover:opacity-80 hover:cursor-pointer transition-all duration-300" />
            ) : (
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-tighter bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent hover:cursor-pointer hover:from-indigo-500 hover:to-purple-500 transition-colors duration-300">
                Upgrade to Premium
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
