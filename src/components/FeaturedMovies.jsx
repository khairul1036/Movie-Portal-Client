import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaFilm } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { AuthContext } from "../provider/AuthProvider";

const FeaturedMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the highest-rated movies
    fetch("https://movie-portal-server-self.vercel.app/highest-rated")
      .then((response) => response.json())
      .then((data) => {
        const sortedMovies = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        setMovies(sortedMovies);
      })
      .catch((error) => error);
  }, []);


  return (
    <div className="bg-gray-900 text-white py-12 px-4">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-500 flex items-center justify-center mb-4">
          <FaFilm className="mr-2" /> Featured Movies
        </h2>
        <p className="text-lg text-gray-400">
          Dive into our collection of top-rated and must-watch movies!
        </p>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-black rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-red-500">{movie.title}</h3>
              <p className="text-sm text-gray-400">
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Duration:</strong> {movie.duration} mins
              </p>
              <p className="text-sm text-gray-400">
                <strong>Year:</strong> {movie.releaseYear}
              </p>
              <div className="text-yellow-400 flex items-center text-sm">
                <FaStar className="mr-1" /> {movie.rating}
              </div>
              <Link
                to={`/movie/${movie._id}`}
                className="inline-block mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}

        {/* If no movies are found */}
        {movies.length === 0 && (
              <p className="text-center text-red-500 col-span-3">
                No movies found
              </p>
            )}
      </div>

      {/* See All Movies Button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/all-movies")}
          className="flex items-center justify-center mx-auto bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300"
        >
          See All Movies <AiOutlineRight className="ml-2 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedMovies;
