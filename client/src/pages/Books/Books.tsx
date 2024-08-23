import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Books.css";

const { Title } = Typography;

const Books: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/books?page=${currentPage}&limit=8`)
      .then((response) => {
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      });
  }, [currentPage]);

  const handleCardClick = (bookId: string) => {
    navigate(`/Books/${bookId}`);
  };

  return (
    <div className="books">
      <Title level={2}>Books</Title>
      <Row gutter={24} className="flex justify-center">
        {books.map((book) => (
          <Col span={6} key={book._id} className="flex justify-center mb-6">
            <Card
              hoverable
              onClick={() => handleCardClick(book._id)}
              cover={
                <img
                  alt={book.name}
                  src={`http://localhost:8080/${book.photo}`}
                  style={{ width: "100%", height: 400, objectFit: "contain" }}
                />
              }
              style={{ width: 350 }}
            >
              <Card.Meta title={book.name} description={book.authorName} />
            </Card>
          </Col>
        ))}
      </Row>
      {/* <Row gutter={16}>
        {books.map((book) => (
          <Col span={6} key={book._id}>
            <Card
              hoverable
              onClick={() => handleCardClick(book._id)}
              cover={
                <img
                  alt={book.name}
                  src={`http://localhost:8080/${book.photo}`}
                  style={{ height: 600, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title={book.name} description={book.authorName} />
            </Card>
          </Col>
        ))}
      </Row> */}
      <Pagination
        style={{ justifyContent: "center", marginBlock: 20 }}
        current={currentPage}
        total={totalPages * 10}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Books;
