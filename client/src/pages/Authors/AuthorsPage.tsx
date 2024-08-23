import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthorsPage.css";

const { Title } = Typography;

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  // Helper function to build the URL
  const buildBooksUrl = (authorName: string, page: number) => {
    return `http://localhost:8080/user/books-by-author?author=${authorName}&page=${page}&limit=8`;
  };

  useEffect(() => {
    // Fetch authors on component mount
    axios.get("http://localhost:8080/user/authors").then((response) => {
      setAuthors(response.data);
    });
  }, []);

  const handleAuthorClick = (authorName: string) => {
    setSelectedAuthor(authorName);
    // Fetch books for the selected author using the helper function
    axios.get(buildBooksUrl(authorName, currentPage)).then((response) => {
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    });
  };

  useEffect(() => {
    if (selectedAuthor) {
      // Fetch books whenever the selected author or current page changes
      axios.get(buildBooksUrl(selectedAuthor, currentPage)).then((response) => {
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      });
    }
  }, [selectedAuthor, currentPage]);

  const handleCardClick = (bookId: string) => {
    navigate(`/Books/${bookId}`);
  };

  return (
    <div className="authors">
      <Title level={2}>Authors</Title>
      <Row gutter={16}>
        {authors.map((author) => (
          <Col span={6} key={author._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={author.fullName}
                  src={`http://localhost:8080/${author.photo}`}
                  style={{ width: "100%", height: 400, objectFit: "cover" }}
                />
              }
              onClick={() => handleAuthorClick(author.fullName)}
            >
              <Card.Meta title={author.fullName} />
            </Card>
          </Col>
        ))}
      </Row>

      {selectedAuthor && (
        <div className="books">
          <Title level={3}>Books in {selectedAuthor}</Title>
          <Row gutter={16}>
            {books.map((book) => (
              <Col span={6} key={book._id} className="mb-6">
                <Card
                  hoverable
                  onClick={() => handleCardClick(book._id)}
                  cover={
                    <img
                      alt={book.name}
                      src={`http://localhost:8080/${book.photo}`}
                      style={{
                        width: "100%",
                        height: 400,
                        objectFit: "contain",
                      }}
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
      )}
    </div>
  );
};

export default AuthorsPage;
