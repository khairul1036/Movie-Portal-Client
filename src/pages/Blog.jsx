import React, { useContext } from "react";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "./Loading";

const Blog = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }

  const blogs = [
    {
      id: 1,
      title: "The Evolution of Superhero Movies: From Comics to the Big Screen",
      author: "Alex Carter",
      date: "December 7, 2024",
      description:
        "Superhero movies have become global blockbusters, evolving from comic books to high-budget cinematic universes. Explore how this genre transformed the film industry.",
    },
    {
      id: 2,
      title: "Top 10 Must-Watch Sci-Fi Movies of All Time",
      author: "Jamie Lee",
      date: "December 7, 2024",
      description:
        "Science fiction has captivated audiences with imaginative worlds and futuristic concepts. Discover the top 10 sci-fi movies that are a must-watch for any movie enthusiast.",
    },
    {
      id: 3,
      title: "Behind the Scenes: How Movie Soundtracks Are Created",
      author: "Morgan Blake",
      date: "December 7, 2024",
      description:
        "Movie soundtracks play a crucial role in creating emotional experiences. Learn how composers and directors collaborate to craft unforgettable film scores.",
    },
    {
      id: 4,
      title: "The Rise of Streaming Platforms: How They Changed the Film Industry",
      author: "Taylor Smith",
      date: "December 7, 2024",
      description:
        "Streaming services revolutionized how we watch movies. Explore how platforms like Netflix and Disney+ reshaped the entertainment landscape.",
    },
    {
      id: 5,
      title: "Iconic Movie Villains We Love to Hate",
      author: "Jordan Taylor",
      date: "December 7, 2024",
      description:
        "Villains add depth and tension to movies. Take a closer look at some of the most iconic antagonists who left a lasting impression on audiences worldwide.",
    },
    {
      id: 6,
      title: "The Art of Cinematography: Visual Storytelling in Movies",
      author: "Casey Brooks",
      date: "December 7, 2024",
      description:
        "Cinematography is more than just camera work—it’s storytelling through visuals. Learn how filmmakers use lighting, angles, and composition to tell powerful stories.",
    },
    {
      id: 7,
      title: "Movie Remakes: When Do They Work and When Do They Fail?",
      author: "Sam Jordan",
      date: "December 7, 2024",
      description:
        "Remakes can breathe new life into classic films—but not all succeed. Discover the key elements that determine whether a remake becomes a hit or a miss.",
    },
    {
      id: 8,
      title: "The Power of Biopics: True Stories That Inspire",
      author: "Riley Morgan",
      date: "December 7, 2024",
      description:
        "Biographical films tell real-life stories of extraordinary people. Explore how biopics inspire and educate audiences through compelling narratives.",
    },
  ];
  

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <div className="bg-black min-h-screen py-10">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl text-red-600 font-extrabold text-center mb-8">
              Blog
            </h1>

            <div className="space-y-8 md:px-10">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3">
                      {blog.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-200 mb-4">
                      <FaUserAlt className="mr-2 text-red-600" />
                      <span>{blog.author}</span>
                      <FaCalendarAlt className="ml-4 mr-2 text-red-600" />
                      <span>{blog.date}</span>
                    </div>
                    <p className="text-gray-200 mb-4">{blog.description}</p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default Blog;
