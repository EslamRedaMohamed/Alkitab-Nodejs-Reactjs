import React from "react";
import "../../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Home: React.FC = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    axios.get("/api/popular-authors").then((response) => {
      setAuthors(response.data);
    });

    axios.get("/api/popular-books").then((response) => {
      setBooks(response.data);
    });

    axios.get("/api/popular-categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="relative bg-cover bg-center text-white h-screen"
        style={{
          backgroundImage:
            "url('https://t4.ftcdn.net/jpg/07/40/50/07/360_F_740500737_2cqls6F62WhJA9ZXpsIiJaz26gFhRRMQ.jpg')",
          marginTop: "-64px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Dark overlay */}
        <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold mb-4">Welcome to Alkitab</h1>
          <p className="text-xl mb-8">
            Discover your next favorite book and share your reading experiences.
          </p>
          <button className="bg-yellow text-white py-3 px-8 rounded-lg font-semibold shadow-md">
            Explore More
          </button>
        </div>
      </section>

      {/* Other sections */}
      {/* Popular Authors Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Authors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example author cards */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src="/path-to-author-image.jpg"
                alt="Author Name"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">Author Name</h3>
            </div>
            {/* Repeat for more authors */}
          </div>
        </div>
      </section>

      {/* Popular Authors Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Authors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{author.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Popular Books Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example book cards */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src="/path-to-book-image.jpg"
                alt="Book Title"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">Book Title</h3>
              <p className="text-gray-600">Author Name</p>
            </div>
            {/* Repeat for more books */}
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Example category cards */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center">
                Category Name
              </h3>
            </div>
            {/* Repeat for more categories */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-orange-400  to-yellow text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
          <p className="text-lg mb-8">
            Become a member and share your book reviews and recommendations.
          </p>
          <button className="bg-white text-text py-3 px-8 rounded-lg font-semibold shadow-md">
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
