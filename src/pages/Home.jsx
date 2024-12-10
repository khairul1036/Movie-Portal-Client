import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BannerSection from "../components/BannerSection";
import FeaturedMovies from "../components/FeaturedMovies";
import TrendingMovies from "../components/trendingMovies";
import Pricing from "../components/Pricing";
import BestMovie from "../components/BestMovie";
import NewMovieTrailer from "../components/NewMovieTrailer";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "./Loading";

const Home = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <section>
          <BannerSection></BannerSection>
        </section>
        <section>
          <NewMovieTrailer></NewMovieTrailer>
        </section>
        <section>
          <FeaturedMovies></FeaturedMovies>
        </section>
        <section>
          <BestMovie></BestMovie>
        </section>
        <section>
          <TrendingMovies></TrendingMovies>
        </section>
        <section>
          <Pricing></Pricing>
        </section>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default Home;
