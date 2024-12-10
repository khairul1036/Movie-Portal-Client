import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Loading from "./Loading";
import { AuthContext } from "../provider/AuthProvider";

const AllMovies = () => {

  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }

  const movies = useLoaderData();

  // State to hold search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter movies based on the search query (case insensitive)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container mx-auto p-6 text-white">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-red-600">
            All Movies
          </h1>

          {/* Search Input */}
          <div className="mb-6 flex justify-start items-center">
            <div className="relative w-full sm:w-1/2 lg:w-1/3 flex items-center">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-3 pl-12 border border-gray-600 rounded-md w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <FaSearch className="absolute left-4 top-3 text-gray-400" />
            </div>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMovies.map((movie, index) => (
              <div
                key={index}
                className="bg-black text-white shadow-xl rounded-lg p-4 hover:shadow-2xl transition duration-300"
              >
                {/* Movie Poster */}
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                {/* Movie Details */}
                <h2 className="text-xl font-semibold mb-2 text-red-600">{movie.title}</h2>
                <p>
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p>
                  <strong>Duration:</strong> {movie.duration} mins
                </p>
                <p>
                  <strong>Release Year:</strong> {movie.releaseYear}
                </p>

                {/* Movie Rating */}
                <div className="text-yellow-400 flex items-center text-sm">
                  <FaStar className="mr-1" /> {movie.rating}
                </div>

                {/* See Details Button */}
                <div className="mt-4">
                  <Link
                    to={`/movie/${movie._id}`}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}

            {/* If no movies are found */}
            {filteredMovies.length === 0 && (
              <p className="text-center text-red-500 col-span-3 h-[200px]">
                No movies found matching your search criteria.
              </p>
            )}
          </div>

          {/* See All Movies Button */}
          <div className="mt-8 text-center">
            <Link to={"/all-movies"}>
              <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300">
                See All Movies
              </button>
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

export default AllMovies;
