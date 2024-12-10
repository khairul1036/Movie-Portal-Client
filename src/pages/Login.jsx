import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa"; // Using React Icons for Google icon

const Login = () => {
  const [error, setError] = useState();
  const { userLogin, setUser, userGoogleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };

        fetch(`https://movie-portal-server-self.vercel.app/users`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("login info update: ", data);
          });

        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        setError("Invalid Credential");
      });
  };

  const handleGoogleSign = (e) => {
    e.preventDefault();
    userGoogleLogin()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // console.log("Goo: ", err);
      });
  };

  const [email, setEmail] = useState("");
  const handleForgotPassword = (e) => {
    e.preventDefault();

    // if (!email.trim()) {
    //   setError("Please enter your email.");
    //   return false;
    // }

    navigate("/auth/forgot-password", { state: { email } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-6 px-4">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              })}
              placeholder="Enter your email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /[A-Z]/,
                  message: "Password must contain at least one uppercase letter",
                },
              })}
              placeholder="Enter your password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Display the error */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-red-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-white">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSign}
          className="w-full flex items-center justify-center py-3 text-white border border-gray-300 hover:border-none rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaGoogle className="mr-2 text-lg" />
          Sign in with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-200 mt-4">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-red-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
