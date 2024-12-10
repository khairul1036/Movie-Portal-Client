import React from "react";
import { FaPlay, FaCalendarAlt, FaFilm } from "react-icons/fa";

// Sample data for New Movie (this can be dynamic or fetched from an API)
const newMovie = {
  title: "The Epic Journey",
  releaseDate: "2024-12-15",
  genre: "Action, Adventure, Fantasy",
  description:
    "An epic adventure that takes our heroes on a journey through uncharted lands. Full of breathtaking landscapes, fierce battles, and deep character development.",
  trailerUrl: "https://www.youtube.com/embed/1-L3sDZAIic?si=fS3c2ha8CH6qXivt", // YouTube trailer URL (change to your actual trailer)
};

const NewMovieTrailer = () => {
  return (
    <div className="py-16 px-4 bg-black text-white">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left Side: Movie Information */}
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h2 className="text-4xl font-bold text-red-500 mb-4">
            <FaFilm className="inline-block text-3xl mr-2" />
            {newMovie.title}
          </h2>
          <div className="text-lg flex items-center gap-2 text-gray-300 mb-2">
            <FaCalendarAlt className="text-red-500" />
            <strong>Release Date:</strong> {newMovie.releaseDate}
          </div>
          <div className="text-lg flex items-center gap-2 text-gray-300 mb-4">
            <FaFilm className="text-red-500" />
            <strong>Genre:</strong> {newMovie.genre}
          </div>
          <p className="text-gray-400 mb-6">{newMovie.description}</p>
          <button className="bg-red-600 flex items-center gap-2 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300">
            <FaPlay className="text-xl" />
            Watch Now
          </button>
        </div>

        {/* Right Side: Movie Trailer */}
        <div className="lg:w-1/2 w-full">
          <div className="relative pb-[56.25%]"> {/* Aspect ratio 16:9 */}
            <iframe
              width="100%"
              height="100%"
              src={newMovie.trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMovieTrailer;
