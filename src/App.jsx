import Sidebar from "./components/Sidebar";
import ChatPage from "./pages/ChatPage";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/homepage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
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
