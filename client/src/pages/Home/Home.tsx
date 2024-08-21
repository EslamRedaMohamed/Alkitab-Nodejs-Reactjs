import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Card, Row, Col } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  console.log("authors: ", authors);
  console.log("books: ", books);
  console.log("categories: ", categories);

  useEffect(() => {
    axios.get("http://localhost:8080/authors").then((response) => {
      setAuthors(response.data);
    });

    axios.get("http://localhost:8080/books").then((response) => {
      setBooks(response.data);
    });

    axios.get("http://localhost:8080/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCardClick = (bookId: string) => {
    navigate(`/Books/${bookId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3)",
          marginTop: "-64px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold mb-4">Welcome to Alkitab</h1>
          <p className="text-xl mb-8">
            Discover your next favorite book and share your reading experiences.
          </p>
          {/* <button className="bg-yellow text-white py-3 px-8 rounded-lg font-semibold shadow-md">
            Explore More
          </button> */}
          <Link
            to="/users/books"
            className="bg-yellow text-white hover:text-black py-3 px-8 rounded-lg font-semibold shadow-md"
          >
            Explore More
          </Link>
        </div>
      </section>

      {/* Popular Authors Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Authors
          </h2>
          {/* <Carousel autoplay dots={true}> */}
          <Row gutter={16}>
            {authors.map((author: any) => (
              <Col span={6} key={author._id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={author.fullName}
                      src={`http://localhost:8080/${author.photo}`}
                      style={{ height: 360 }}
                    />
                  }
                >
                  <Card.Meta title={author.fullName} />
                </Card>
              </Col>
            ))}
          </Row>
          {/* </Carousel> */}
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Books</h2>
          <Carousel autoplay dots={true}>
            {books.map((book: any) => (
              <div key={book._id}>
                <Card
                  className="size-1/4"
                  hoverable
                  onClick={() => handleCardClick(book._id)}
                  cover={
                    <img
                      alt={book.name}
                      src={`http://localhost:8080/${book.photo}`}
                      style={{ height: 500 }}
                    />
                  }
                >
                  <Card.Meta title={book.name} description={book.authorName} />
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Categories
          </h2>
          <Carousel autoplay dots={true}>
            {categories.map((category: any) => (
              <div key={category._id}>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-semibold">
                    {category.categoryName}
                  </h3>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-orange-400 to-yellow text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
          <p className="text-lg mb-8">
            Become a member and share your book reviews and recommendations.
          </p>
          <Link
            to="/register"
            className="bg-white text-text py-3 px-8 rounded-lg font-semibold shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
