import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Importing home icon from React Icons

const NotFound = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="flex items-center justify-center h-[600px] text-white">
          <div className="text-center p-8 shadow-lg rounded-lg w-full max-w-md">
            <h1 className="text-6xl font-extrabold mb-4 text-white">404</h1>
            <p className="text-2xl font-semibold text-white mb-6">Oops! Page Not Found</p>
            <p className="text-white mb-6">
              The page you're looking for might have been moved or doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              <FaHome className="mr-2" /> Go Back to Home
            </Link>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default NotFound;
