import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded, userId, navigate]);

  return <div className="flex flex-col text-white p-4">Chat page</div>;
};

export default ChatPage;
