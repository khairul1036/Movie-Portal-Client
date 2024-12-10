import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      {/* Top Section with Logo */}
      <div className="py-8 flex justify-center items-center bg-red-700">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold">
          <img className="w-16 h-16 rounded-full" src={logo} alt="logo" />
          <span className="text-white">Movie Portal</span>
        </Link>
      </div>

      {/* Footer Content */}
      <footer className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 py-10">
        {/* About Section */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-red-500">About</h6>
          <p>
            Discover an extensive collection of movies, from classic hits to the
            latest blockbusters. Stream, watch, and manage your favorites with
            ease.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-red-500">
            Quick Links
          </h6>
          <nav>
            <Link to="/" className="block hover:text-red-500 mb-2">
              Home
            </Link>
            <Link to="/auth/login" className="block hover:text-red-500 mb-2">
              Login
            </Link>
            <Link to="/auth/register" className="block hover:text-red-500 mb-2">
              Register
            </Link>
            <Link
              to="/auth/user-profile"
              className="block hover:text-red-500 mb-2"
            >
              My Profile
            </Link>
          </nav>
        </div>

        {/* Contact Us Section */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-red-500">
            Contact Us
          </h6>
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:info@movieportal.com"
              className="text-gray-300 hover:text-red-500"
            >
              info@movieportal.com
            </a>
          </p>
          <p className="mb-2">
            Phone:{" "}
            <a
              href="tel:+11234567890"
              className="text-gray-300 hover:text-red-500"
            >
              +880 1788763214
            </a>
          </p>
          <p className="mb-2">
            Address:{" "}
            <span className="text-gray-300">
              DSC, Dhaka, Bangladesh
            </span>
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-red-500">Follow Us</h6>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div className="bg-black py-4 border-t border-gray-700 text-center">
        <p className="text-sm text-gray-400">
          Copyright © {new Date().getFullYear()} Movie Portal. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
