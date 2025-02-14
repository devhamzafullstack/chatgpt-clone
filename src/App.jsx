import { useAuth } from "@clerk/clerk-react";
import Sidebar from "./components/Sidebar";
import ChatPage from "./pages/ChatPage";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { Navigate, Route, Routes} from "react-router-dom";
import { Loader2 } from "lucide-react";
import Homepage from "./pages/homepage";

const App = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={64} className="text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/chats/:id" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
