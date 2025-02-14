import { SignInButton, useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/dashboard");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={64} className="text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 w-full min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-sm md:text-lg lg:text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <div className="flex justify-center mb-6">
          <SignInButton className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-xs md:text-base lg:text-lg">
            Sign In with Clerk
          </SignInButton>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm lg:text-base text-gray-600">
            Don't have an account? {<br />}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-700">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
