// SignInPage.jsx
import { SignInButton, useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignInPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/dashboard");
    }
  }, [isLoaded, userId, navigate]);

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col justify-between w-full overflow-hidden">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/3 -translate-y-1/2 w-156 h-128 bg-purple-600/20 rounded-full blur-xl md:blur-3xl animate-pulse z-0" />

      <div className="flex flex-col flex-grow z-10">
        <nav className="flex justify-between items-center mb-4 md:mb-8">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent p-2 rounded-2xl border-b border-white"
          >
            Next AI
          </Link>
        </nav>

        <div className="flex flex-col items-center justify-center flex-grow text-center space-y-12 sm:space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>

            <div className="flex justify-center">
              <SignInButton className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-600/20 text-white">
                Sign In with Clerk
              </SignInButton>
            </div>

            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-500 hover:text-indigo-500 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <footer className="text-center text-gray-500 border-t border-white/10 pt-8 mt-16">
          <p className="text-sm font-semibold">Hamza Khan</p>
          <p className="text-sm">© 2025 AI Chat. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SignInPage;
