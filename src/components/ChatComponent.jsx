import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { CgAttachment } from "react-icons/cg";
import Upload from "./Upload";
const ChatComponent = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });

  return (
    // In ChatComponent.jsx
    <div className="w-full mt-4">
      <div className="relative group w-full max-w-2xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
        <div className="relative flex items-center bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-2">
          <Upload />
          {/* <label
            htmlFor="file"
            className="hover:text-indigo-300 transition-all duration-300 cursor-pointer p-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:scale-110"
          >
            <CgAttachment />
          </label> */}
          <input type="file" id="file" className="hidden" multiple={false} />
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-4 py-3 text-sm placeholder-gray-500 border-none outline-none text-white"
          />
          <button className="ml-2 p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:scale-110 transition-transform hover:text-indigo-300 cursor-pointer">
            <FaArrowRight className="w-5 h-5 text-white hover:text-indigo-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
