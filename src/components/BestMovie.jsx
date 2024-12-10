import React from "react";
import { FaStar, FaPlay } from "react-icons/fa";

const bestMovie = {
  title: "The Greatest Movie",
  description:
    "A thrilling adventure that takes you through the most unexpected twists and turns. Follow the journey of a hero who must face impossible odds.",
  rating: 5.0,
  genre: "Action, Adventure",
  poster: "https://m.media-amazon.com/images/I/71BokibfVUL._AC_SL1500_.jpg",
};

const BestMovie = () => {
  return (
    <div className="py-16 px-4 bg-black text-white">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Movie Poster */}
        <div className="lg:w-1/2 w-full">
          <img
            src={bestMovie.poster}
            alt={bestMovie.title}
            className="w-full h-auto rounded-lg shadow-md object-cover transform hover:scale-105 transition duration-300"
          />
        </div>

        {/* Right Side: Movie Information */}
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h2 className="text-4xl font-bold text-red-500 mb-4">{bestMovie.title}</h2>
          <div className="flex items-center justify-center lg:justify-start text-yellow-400 mb-4 text-lg">
            <FaStar className="mr-2" />
            <strong>{bestMovie.rating}/10</strong>
          </div>
          <div className="text-xl text-gray-300 mb-6">
            <strong>Genre:</strong> {bestMovie.genre}
          </div>
          <p className="text-gray-400 text-lg mb-8">
            {bestMovie.description}
          </p>
          <button className="flex items-center justify-center bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition duration-300">
            <FaPlay className="mr-2" />
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestMovie;
