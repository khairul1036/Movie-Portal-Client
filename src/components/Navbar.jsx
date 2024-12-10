import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";
import { IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply theme class to HTML element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `hover:text-red-500 ${isActive ? "text-red-500" : "text-white"}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/all-movies"}
          className={({ isActive }) =>
            `hover:text-red-500 ${isActive ? "text-red-500" : "text-white"}`
          }
        >
          All Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/blog"}
          className={({ isActive }) =>
            `hover:text-red-500 ${isActive ? "text-red-500" : "text-white"}`
          }
        >
          Blog
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to={"/add-movie"}
              className={({ isActive }) =>
                `hover:text-red-500 ${isActive ? "text-red-500" : "text-white"}`
              }
            >
              Add Movie
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/my-favorites"}
              className={({ isActive }) =>
                `hover:text-red-500 ${isActive ? "text-red-500" : "text-white"}`
              }
            >
              My Favorites
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-black text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-red-500 text-xl font-bold"
          >
            {/* <img className="w-10 h-10 rounded-full block md:hidden" src={logo} alt="logo" /> */}
            <span className="block md:hidden">
              Movie <br /> Portal
            </span>
            <span className="hidden md:block">Movie Portal</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">{links}</ul>
        </div>

        <div className="navbar-end">
          <div className="mr-2">
            <IoSunny className="text-3xl" />
          </div>
          {user?.email ? (
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img
                  className="w-12 h-12 rounded-full border-2 border-red-500"
                  src={
                    user?.photoURL ||
                    "https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                  }
                  alt="User"
                />
                <div className="absolute top-12 -left-12 transform -translate-x-1/2 bg-black text-white text-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 ring-2">
                  <p className="mb-1">{user?.displayName}</p>
                  {/* <p>{user?.email}</p> */}
                  <button
                    className="flex items-center gap-2 p-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    onClick={logOut}
                  >
                    <h3>Logout</h3>
                    <IoIosLogOut className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/auth/login"
                className="btn border-red-600 hover:border-red-600 hover:bg-transparent bg-red-600 text-white"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn border-red-600 hover:border-red-600 hover:bg-transparent bg-red-600 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
