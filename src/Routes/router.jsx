import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import AddMovie from "../pages/AddMovie";
import AllMovies from "../pages/AllMovies";
import MovieDetails from "../pages/MovieDetails";
import MyFavorites from "../pages/MyFavorites";
import NotFound from "../pages/NotFound";
import UpdateMovie from "../pages/UpdateMovie";
import ForgotPassword from "../pages/ForgotPassword ";
import Blog from "../pages/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/blog",
    element: <Blog></Blog>,
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    //   {
    //     path: "/auth/user-profile",
    //     // element: (
    //     // //   <PrivateRouter>
    //     // //     <MyProfile></MyProfile>
    //     // //   </PrivateRouter>
    //     // ),
    //   },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
  {
    path: "/add-movie",
    element: (
      <PrivateRouter>
        <AddMovie></AddMovie>
      </PrivateRouter>
    ),
  },
  {
    path: "/all-movies",
    element: <AllMovies></AllMovies>,
    loader: () => fetch("https://movie-portal-server-self.vercel.app/movies"),
  },
  {
    path: "/movie/:id",
    element: (
      <PrivateRouter>
        <MovieDetails></MovieDetails>
      </PrivateRouter>
    ),
    loader: ({ params }) => fetch(`https://movie-portal-server-self.vercel.app/movie/${params.id}`),
  },
  {
    path: "/my-favorites",
    element: (
      <PrivateRouter>
        <MyFavorites></MyFavorites>
      </PrivateRouter>
    ),
    loader: ({ params }) => fetch(`https://movie-portal-server-self.vercel.app/movies/favorites`),
  },
  {
    path: "/update-movies/:id",
    element: (
      <PrivateRouter>
        <UpdateMovie></UpdateMovie>
      </PrivateRouter>
    ),
    loader: ({ params }) => fetch(`https://movie-portal-server-self.vercel.app/movies/${params.id}`),
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
