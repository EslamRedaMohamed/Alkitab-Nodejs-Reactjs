import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Row, Typography, Pagination } from "antd";
import "../../index.css";

const { Title } = Typography;

const AuthorPage: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const [author, setAuthor] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch author details and then fetch books
    const fetchAuthorAndBooks = async () => {
      try {
        const authorResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/authors/${authorId}`
        );
        const fetchedAuthor = authorResponse.data;
        setAuthor(fetchedAuthor);

        const booksResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/books-by-author?author=${fetchedAuthor.fullName}&page=${currentPage}&limit=8`
        );
        setBooks(booksResponse.data.books);
        setTotalPages(booksResponse.data.totalPages);
      } catch (error) {
        console.error("Error fetching author or books:", error);
      }
    };

    fetchAuthorAndBooks();
  }, [authorId, currentPage]);

  const handleCardClick = (bookId: string) => {
    navigate(`/Books/${bookId}`);
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {author && (
        <div className="text-center mb-8">
          <img
            src={`${import.meta.env.VITE_API_URL}/${author.photo}`}
            alt={author.fullName}
            style={{ width: "200px", height: "auto", borderRadius: "50%" }}
          />
          <h2 className="text-start text-3xl font-bold mt-4">
            {author.fullName}
          </h2>
          <p className="text-start text-lg text-text-600">
            {" "}
            {formatDate(author.dateOfBirth)}
          </p>
        </div>
      )}
      <Title level={3} className="mb-4">
        Books by {author?.fullName}
      </Title>
      <Row gutter={16}>
        {books.map((book) => (
          <Col span={6} key={book._id}>
            <Card
              hoverable
              onClick={() => handleCardClick(book._id)}
              cover={
                <img
                  alt={book.name}
                  src={`${import.meta.env.VITE_API_URL}/${book.photo}`}
                  style={{ width: "100%", height: 400, objectFit: "contain" }}
                />
              }
            >
              <Card.Meta title={book.name} description={book.authorName} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        style={{ justifyContent: "center", marginBlock: 20 }}
        current={currentPage}
        total={totalPages * 10}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AuthorPage;
