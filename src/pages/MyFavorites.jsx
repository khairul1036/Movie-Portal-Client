import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrashAlt, FaStar } from "react-icons/fa";

const MyFavorites = () => {
  const { user } = useContext(AuthContext); // Logged-in user
  const loadFavoriteMovies = useLoaderData(); // List of favorite movies

  // Set initial favorite movies in the state
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Filter favorite movies based on the logged-in user's email
  useEffect(() => {
    const filteredMovies = loadFavoriteMovies.filter(
      (movie) => movie.email === user?.email
    );
    setFavoriteMovies(filteredMovies); // Update state with filtered movies
  }, [loadFavoriteMovies, user]);

  // Handle deleting a movie from the favorites list
  const handleDeleteFavorite = (_id) => {
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
        fetch(`https://movie-portal-server-self.vercel.app/movies/favorites/${_id}`, {
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

              // Update the list by filtering out the deleted movie from the state
              setFavoriteMovies((prevMovies) =>
                prevMovies.filter((movie) => movie._id !== _id)
              );
            } else {
              Swal.fire({
                title: "Failed!",
                text: "Something went wrong, please try again.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            // console.error("Error deleting movie:", error);
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the movie. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto p-6">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
          My Favorite Movies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-black text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{movie.title}</h3>
                <p className="text-sm text-gray-400">
                  Duration: {movie.duration} minutes
                </p>
                <p className="text-sm text-gray-400">
                  Release Year: {movie.releaseYear}
                </p>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span>{movie.rating}</span>
                </div>
                <button
                  onClick={() => handleDeleteFavorite(movie._id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 w-full"
                >
                  <FaTrashAlt className="inline-block mr-2" />
                  Delete Favorite
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 h-[500px]">
              No favorite movies found.
            </p>
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MyFavorites;
