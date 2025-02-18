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

const SidebarLink = ({ to, icon: Icon, text, isOpen }) => (
  <Link
    to={to}
    className={`w-full transition-all duration-300 hover:bg-purple-500/20 rounded-lg p-1.5 sm:p-2 md:p-2.5 flex items-center text-white ${
      isOpen ? "justify-start" : "justify-center"
    }`}
  >
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
    {isOpen && (
      <span className="ml-2 text-xs sm:text-sm md:text-base truncate">
        {text}
      </span>
    )}
  </Link>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex h-screen transition-all duration-300">
      <div
        className={`transition-all duration-300 flex flex-col p-1.5 sm:p-2 md:p-2.5 gap-3 sm:gap-4 items-start bg-black text-white border-r border-white/10 ${
          isOpen ? "w-30 md:w-56 lg:w-64" : "w-12 sm:w-14 md:w-16"
        }`}
      >
        <button
          className="w-full hover:bg-purple-500/20 p-1.5 sm:p-2 mt-1 rounded-lg text-white flex justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <FiMenu className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        <div className="w-full flex flex-col gap-4">
          <SidebarLink to="/" icon={FiHome} text="Home" isOpen={isOpen} />

          <SignedOut>
            <SidebarLink
              to="/signup"
              icon={FiUserPlus}
              text="Sign up"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/signin"
              icon={FiLogIn}
              text="Sign in"
              isOpen={isOpen}
            />
          </SignedOut>

          <SignedIn>
            <SidebarLink
              to="/dashboard"
              icon={MdDashboard}
              text="Dashboard"
              isOpen={isOpen}
            />
          </SignedIn>
        </div>

        <SignedIn>
          <div className="mt-auto w-full  flex transition-all duration-300 hover:bg-purple-500/20 rounded-full items-center text-white hover:animate-[pulse2_3s_cubic-bezier(0.4,0,0.6,1)_infinite] mb-1">
            <div className=" sm:block border border-white rounded-full flex ">
              <UserButton
                appearance={{
                  elements: {
                    userButtonTrigger: "text-white",
                  },
                }}
              />
            </div>
            {isOpen && user && (
              <div className="ml-2 flex flex-col overflow-hidden">
                <span className="text-[8px] sm:text-[10px] md:text-xs text-white truncate">
                  Logged in:
                </span>
                <span className="font-medium text-xs sm:text-sm md:text-base text-white truncate">
                  {user.fullName.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Sidebar;
