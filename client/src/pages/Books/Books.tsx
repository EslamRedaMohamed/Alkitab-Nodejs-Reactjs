import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Pagination } from "antd";
import axios from "axios";
import "./Books.css";

const { Title } = Typography;

const Books: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/books?page=${currentPage}&limit=8`)
      .then((response) => {
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      });
  }, [currentPage]);

  return (
    <div className="books">
      <Title level={2}>Books</Title>
      <Row gutter={16}>
        {books.map((book) => (
          <Col span={6} key={book._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={book.name}
                  src={
                    // book.photo ||
                    "https://ew.com/thmb/W-tJTEPg1bib_coJZjrN3d_75rg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9781408855713-c5b0594eaaa2497aac2e003b7fd2fbd4.jpg"
                  }
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

export default Books;
