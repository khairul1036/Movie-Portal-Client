import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa"; // Importing Google Icon

const Register = () => {
  const [error, setError] = useState();
  const { createNewUser, setUser, updateUserProfile, userGoogleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    setError("");

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        const createdAt = result?.user?.metadata?.creationTime;
        const newUser = { name, email, photo, createdAt };

        setUser(user);
        fetch("https://movie-portal-server-self.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              // console.log("User created successfully");
            }
          });

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            setError("Error updating profile.");
          });
      })
      .catch((error) => {
        setError("Error creating user.");
      });
  };

  const handleGoogleSign = (e) => {
    e.preventDefault();
    userGoogleLogin()
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        setError("Google sign-in failed.");
      });
  };

  return (
    <div id="regbg" className="flex justify-center items-center px-5 py-10 h-screen bg-gray-900">
      <div className="bg-black p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
            {errors.name && (
              <p className="text-red-600 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL Field */}
          <div className="mb-4">
            <label htmlFor="photo-url" className="block text-sm font-medium text-white">
              Photo URL
            </label>
            <input
              type="url"
              id="photo-url"
              {...register("photo", { required: "Photo URL is required" })}
              placeholder="Enter your photo URL"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
            {errors.photo && (
              <p className="text-red-600 text-xs">{errors.photo.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /[A-Za-z]/,
                  message: "Password must contain at least one uppercase and one lowercase letter",
                },
              })}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
            {errors.password && (
              <p className="text-red-600 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-400 rounded-md text-red-700 text-xs">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSign}
          className="w-full flex items-center justify-center py-3 text-white border border-gray-300 hover:border-none rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-200 mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
