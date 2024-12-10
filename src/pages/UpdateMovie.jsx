import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Select from "react-select";
import { FaImage, FaRegCalendarAlt, FaStar, FaFilm } from "react-icons/fa"; // React Icons

const UpdateMovie = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    poster: "",
    title: "",
    genre: [],
    duration: "",
    releaseYear: "",
    rating: 0,
    summary: "",
  });

  const genreOptions = ["Comedy", "Drama", "Horror", "Action", "Romance"];

  useEffect(() => {
    fetch(`https://movie-portal-server-self.vercel.app/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setMovieData(data))
      .catch((err) => err);
  }, [id]);

  const handleChange = (selectedOptions, actionMeta) => {
    if (actionMeta.name === "tags") {
      setMovieData({
        ...movieData,
        tags: selectedOptions.map((option) => option.value),
      });
    } else if (actionMeta.name === "genre") {
      setMovieData({
        ...movieData,
        genre: selectedOptions.map((option) => option.value),
      });
    } else {
      setMovieData({ ...movieData, [actionMeta.name]: selectedOptions });
    }
  };

  const handleRatingChange = (rate) => {
    setMovieData({ ...movieData, rating: rate });
  };

  const validateForm = () => {
    if (!movieData.poster || !/^https?:\/\//.test(movieData.poster)) {
      toast.error("Movie Poster must be a valid URL.");
      return false;
    }
    if (!movieData.title || movieData.title.length < 2) {
      toast.error("Movie Title must have at least 2 characters.");
      return false;
    }
    if (movieData.genre.length === 0) {
      toast.error("Please select at least one Genre.");
      return false;
    }
    if (!movieData.duration || movieData.duration <= 60) {
      toast.error("Duration must be greater than 60 minutes.");
      return false;
    }
    if (!movieData.releaseYear) {
      toast.error("Please select a Release Year.");
      return false;
    }
    if (movieData.rating === 0) {
      toast.error("Please select a Rating.");
      return false;
    }
    if (!movieData.summary || movieData.summary.length < 10) {
      toast.error("Summary must have at least 10 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedMovie = { ...movieData };

      fetch(`https://movie-portal-server-self.vercel.app/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Movie updated successfully!");
            navigate(`/movie/${id}`);
          }
        });
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="bg-black py-20 px-5">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
            Update Movie
          </h2>
          <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Movie Poster URL */}
              <div className="flex items-center space-x-2">
                <FaImage className="text-red-500" />
                <label className="block font-medium">Movie Poster (URL)</label>
              </div>
              <input
                type="text"
                name="poster"
                value={movieData.poster}
                onChange={(e) =>
                  setMovieData({ ...movieData, poster: e.target.value })
                }
                placeholder="Enter image URL"
                className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-500"
              />

              {/* Movie Title */}
              <div className="flex items-center space-x-2">
                <FaFilm className="text-red-500" />
                <label className="block font-medium">Movie Title</label>
              </div>
              <input
                type="text"
                name="title"
                value={movieData.title}
                onChange={(e) =>
                  setMovieData({ ...movieData, title: e.target.value })
                }
                placeholder="Enter movie title"
                className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-500"
              />

              {/* Genre Multi-Select Dropdown */}
              <div className="flex items-center space-x-2">
                <FaRegCalendarAlt className="text-red-500" />
                <label className="block font-medium">Genre</label>
              </div>
              <Select
                isMulti
                name="genre"
                options={genreOptions.map((genre) => ({
                  value: genre,
                  label: genre,
                }))}
                value={movieData.genre.map((genre) => ({
                  value: genre,
                  label: genre,
                }))}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-700 rounded-md bg-gray-800 text-black focus:outline-none focus:border-red-500"
              />

              {/* Duration */}
              <div className="flex items-center space-x-2">
                <FaRegCalendarAlt className="text-red-500" />
                <label className="block font-medium">
                  Duration (in minutes)
                </label>
              </div>
              <input
                type="number"
                name="duration"
                value={movieData.duration}
                onChange={(e) =>
                  setMovieData({ ...movieData, duration: e.target.value })
                }
                placeholder="Enter duration"
                className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-500"
              />

              {/* Release Year */}
              <div className="flex items-center space-x-2">
                <FaRegCalendarAlt className="text-red-500" />
                <label className="block font-medium">Release Year</label>
              </div>
              <select
                name="releaseYear"
                value={movieData.releaseYear}
                onChange={(e) =>
                  setMovieData({ ...movieData, releaseYear: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-500"
              >
                <option value="">Select Year</option>
                {[2024, 2023, 2022, 2021, 2020].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-500" />
                <label className="block font-medium">Rating</label>
              </div>
              <Rating
                onClick={handleRatingChange}
                ratingValue={movieData.rating}
                size={24}
                className="text-yellow-500"
              />

              {/* Summary */}
              <div>
                <label className="block font-medium">Summary</label>
                <textarea
                  name="summary"
                  value={movieData.summary}
                  onChange={(e) =>
                    setMovieData({ ...movieData, summary: e.target.value })
                  }
                  placeholder="Write a short summary"
                  className="w-full p-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-500"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Update Movie
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default UpdateMovie;
