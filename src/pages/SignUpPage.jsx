import { SignUpButton, useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/dashboard");
    }
  }, [isLoaded, userId, navigate]);

  return (
    <div className="p-4 w-full min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-sm md:text-lg lg:text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <div className="flex justify-center mb-6">
          <SignUpButton className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-xs md:text-base lg:text-lg">
            Sign Up with Clerk
          </SignUpButton>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm lg:text-base text-gray-600 ">
            Have an account? {<br />}
            <a href="/signin" className="text-indigo-600 hover:text-indigo-700">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
