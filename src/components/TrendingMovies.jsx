import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const TrendingMovies = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const movies = [
    {
      image:
        "https://m.media-amazon.com/images/I/71BokibfVUL._AC_SL1500_.jpg",
      title: "Dune",
      year: 2024,
      rating: 4.7,
    },
    {
      image:
        "https://i.pinimg.com/474x/8b/44/91/8b44918afa2aa2773396dd8bf6e6ea3a.jpg",
      title: "Titanic",
      year: 2023,
      rating: 4.5,
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61OgI8Ih3CL.jpg",
      title: "Avatar",
      year: 2022,
      rating: 4.0,
    },
    {
      image:
        "https://m.media-amazon.com/images/I/A1f7vq1AwuL.jpg",
      title: "Batman",
      year: 2024,
      rating: 4.1,
    },
    {
      image:
        "https://m.media-amazon.com/images/I/61OUGpUfAyL._AC_SL1000_.jpg",
      title: "Tenet",
      year: 2023,
      rating: 4.8,
    },
  ];

  return (
    <div className="bg-gray-900 text-white py-12 px-4">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-red-500 mb-4">
          Trending Movies
        </h2>
        <p className="text-xl text-gray-300">
          Discover the hottest movies everyone's watching right now!
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="bg-black rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            {/* Movie Poster */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-56 object-cover"
            />

            {/* Movie Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{movie.title}</h3>
              <p className="text-gray-400">
                {movie.year} |{" "}
                <span className="flex items-center text-yellow-400">
                  <FaStar className="mr-1" /> {movie.rating}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
