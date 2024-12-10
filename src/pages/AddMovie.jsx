import React, { useContext, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Select from "react-select"; // Importing the react-select component
import { FaUpload } from "react-icons/fa"; // Icon for the upload

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const [movieData, setMovieData] = useState({
    poster: "",
    title: "",
    genre: [], // Genre is an array to hold multiple selected values
    duration: "",
    releaseYear: "",
    rating: 0,
    summary: "",
  });

  const genreOptions = ["Comedy", "Drama", "Horror", "Action", "Romance"];

  // Handle input changes for form fields
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

  // Handle rating change (from the star rating component)
  const handleRatingChange = (rate) => {
    setMovieData({ ...movieData, rating: rate });
  };

  // Validate form before submission
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const createdAt = new Date();
      const newMovie = { ...movieData, createdAt: createdAt };
      // console.log("Movie added:", newMovie);

      // Save new movie to the database
      fetch("https://movie-portal-server-self.vercel.app/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("added movie: ", data);
          if (data.insertedId) {
            toast.success("Movie added successfully!");
            setMovieData({
              poster: "",
              title: "",
              genre: [],
              duration: "",
              releaseYear: "",
              rating: 0,
              summary: "",
            });
          }
        });
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen bg-black text-white py-20 px-5">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
          Add a Movie
        </h2>
        <section className="max-w-4xl mx-auto p-8 bg-gray-800 rounded-lg shadow-xl">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Movie Poster URL */}
            <div>
              <label className="block font-medium text-lg">
                Movie Poster (URL)
              </label>
              <input
                type="text"
                name="poster"
                value={movieData.poster}
                onChange={(e) =>
                  setMovieData({ ...movieData, poster: e.target.value })
                }
                placeholder="Enter image URL"
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-md"
              />
            </div>

            {/* Movie Title */}
            <div>
              <label className="block font-medium text-lg">Movie Title</label>
              <input
                type="text"
                name="title"
                value={movieData.title}
                onChange={(e) =>
                  setMovieData({ ...movieData, title: e.target.value })
                }
                placeholder="Enter movie title"
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-md"
              />
            </div>

            {/* Genre Multi-Select Dropdown */}
            <div>
              <label className="block font-medium text-lg">Genre</label>
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
                className="w-full p-3 bg-gray-700 text-black border-2 border-gray-600 rounded-md"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block font-medium text-lg">
                Duration (in minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={movieData.duration}
                onChange={(e) =>
                  setMovieData({ ...movieData, duration: e.target.value })
                }
                placeholder="Enter duration"
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-md"
              />
            </div>

            {/* Release Year */}
            <div>
              <label className="block font-medium text-lg">Release Year</label>
              <select
                name="releaseYear"
                value={movieData.releaseYear}
                onChange={(e) =>
                  setMovieData({ ...movieData, releaseYear: e.target.value })
                }
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-md"
              >
                <option value="">Select Year</option>
                {[2024, 2023, 2022, 2021, 2020].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block font-medium text-lg">Rating</label>
                <Rating
                  onClick={handleRatingChange}
                  ratingValue={movieData.rating}
                  size={24}
                  className="text-yellow-500"
                />
            </div>

            {/* Summary */}
            <div>
              <label className="block font-medium text-lg">Summary</label>
              <textarea
                name="summary"
                value={movieData.summary}
                onChange={(e) =>
                  setMovieData({ ...movieData, summary: e.target.value })
                }
                placeholder="Write a short summary"
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-md"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-700 transition duration-300"
            >
              <FaUpload className="inline-block mr-2" />
              Add Movie
            </button>
          </form>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AddMovie;
