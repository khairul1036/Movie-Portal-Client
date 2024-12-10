import React, { useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaHeart, FaTrashAlt, FaEdit } from "react-icons/fa";

const MovieDetails = () => {
  const { user } = useContext(AuthContext);
  const movie = useLoaderData();
  const {
    _id,
    poster,
    title,
    genre,
    duration,
    releaseYear,
    rating,
    summary,
    createdAt,
  } = movie;
  const navigate = useNavigate();

  // Function to handle delete movie
  const handleDeleteMovie = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-portal-server-self.vercel.app/movie/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your movie has been deleted.",
                icon: "success",
              });
              navigate("/all-movies");
            }
          });
      }
    });
  };

  // Function to handle add to favorite
  const handleAddToFavorite = async () => {
    const userEmail = user?.email;
    const favoriteMovie = {
      _id,
      poster,
      title,
      genre,
      duration,
      releaseYear,
      rating,
      summary,
      createdAt,
      email: userEmail,
    };

    fetch("https://movie-portal-server-self.vercel.app/movies/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Favorite movie added successfully!");
        }else{
          toast.error("Favorite movie added!");
        }
      });
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <ToastContainer />
        <div className="container mx-auto p-6 text-white">
          {/* Movie Header Section */}
          <div className="flex flex-col sm:flex-row bg-black rounded-lg overflow-hidden shadow-lg mb-8">
            <img
              src={poster}
              alt={title}
              className="w-full sm:w-1/2 h-[400px] object-cover rounded-lg"
            />
            <div className="sm:ml-6 p-6 flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-red-600 mb-2">{title}</h2>
              <p className="text-gray-400 mb-2">
                <strong>Genre:</strong> {genre}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Duration:</strong> {duration} mins
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Release Year:</strong> {releaseYear}
              </p>
              <p className="text-yellow-400 mb-4 flex items-center">
                <FaHeart className="mr-1" /> {rating}
              </p>

              {/* Movie Actions Section */}
              <div className="flex gap-4 justify-center">
                <Link to={`/update-movies/${_id}`}>
                  <button className="flex justify-center items-center bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition duration-300">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={handleDeleteMovie}
                  className="flex justify-center items-center bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition duration-300"
                >
                  <FaTrashAlt/>
                </button>
                <button
                  onClick={handleAddToFavorite}
                  className="flex justify-center items-center bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>

          {/* Movie Summary Section */}
          <div className="bg-black text-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Summary</h3>
            <p className="text-gray-300">{summary}</p>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MovieDetails;
