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

  const handleCardClick = (type: string, id: string) => {
    navigate(`/${type}/${id}`);
    console.log(`${type} Id: ` + id);
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
          <Row gutter={16}>
            {authors.slice(0, 4).map((author: any) => (
              <Col span={6} key={author._id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick("authors", author._id)}
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
        </div>
      </section>

      {/* Recent Books Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Books</h2>
          <Row gutter={16}>
            {books.slice(0, 4).map((book: any) => (
              <Col span={6} key={book._id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick("Books", book._id)}
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
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Categories
          </h2>
          <Row gutter={8}>
            {categories.slice(0, 8).map((category: any) => (
              <Col span={3} key={category._id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick("categories", category._id)}
                >
                  <Card.Meta title={category.categoryName} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 mb-16 bg-gradient-to-r from-orange-400 to-yellow text-white text-center">
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

      {/* About Us Section */}
      {/* <section className="py-16 bg-gray-100"> */}
      <section
        className="relative bg-cover bg-center text-white py-16"
        style={{
          backgroundImage:
            // https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fbooks-black-background&psig=AOvVaw3Mq8bMHEd6JR_wCzSjd6sQ&ust=1724426854026000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJiv_eX0iIgDFQAAAAAdAAAAABAE
            "url('https://www.shutterstock.com/image-photo/literature-reading-concept-banner-header-600nw-1471264619.jpg')",
          marginTop: "-64px",
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Alkitab is a platform dedicated to book lovers, providing a place to
            discover, review, and share books. Whether you're looking for your
            next great read or want to share your thoughts on a favorite book,
            Alkitab is the perfect community for you. Our mission is to connect
            readers with the books they love and to foster a vibrant community
            of book enthusiasts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
