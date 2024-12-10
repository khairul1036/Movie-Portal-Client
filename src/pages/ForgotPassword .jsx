import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEnvelope } from "react-icons/fa"; // Importing email icon

const ForgotPassword = () => {
  const [error, setError] = useState();
  const { forgotPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Get email from the state and set it to input
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    forgotPassword(email)
      .then(() => {
        // Redirect user to Gmail for password reset
        window.location.href = "https://mail.google.com";
      })
      .catch((error) => {
        setError("Error: " + error.message);
      });
  };

  return (
    <div id="regbg" className="bg-gray-900 flex justify-center items-center px-5 py-10 h-[600px]">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Forgot Password</h2>

        <form onSubmit={handleResetPassword}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="inline-block mr-2 text-red-600" /> <span className="text-white">Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Display the error */}
          {error && (
            <div className="mb-3 p-3 bg-red-100 border border-red-400 rounded-md text-red-700 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Reset Password
          </button>
        </form>

        <button
          onClick={() => navigate("/auth/login")}
          className="mt-4 text-center text-sm text-red-600 hover:underline block w-full"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
