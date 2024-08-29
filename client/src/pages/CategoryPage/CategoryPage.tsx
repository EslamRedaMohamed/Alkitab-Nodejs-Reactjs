import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Row, Typography, Pagination } from "antd";
import "../../index.css";

const { Title } = Typography;

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch category details and then fetch books
    const fetchCategoryAndBooks = async () => {
      try {
        const categoryResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories/${categoryId}`
        );
        const fetchedCategory = categoryResponse.data;
        setCategory(fetchedCategory);

        const booksResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/books-by-category?category=${fetchedCategory.categoryName}&page=${currentPage}&limit=8`
        );
        setBooks(booksResponse.data.books);
        setTotalPages(booksResponse.data.totalPages);
      } catch (error) {
        console.error("Error fetching category or books:", error);
      }
    };

    fetchCategoryAndBooks();
  }, [categoryId, currentPage]);

  const handleCardClick = (bookId: string) => {
    navigate(`/Books/${bookId}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {category && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mt-4">{category.categoryName}</h2>
        </div>
      )}
      <Title level={3} className="mb-4">
        Books in {category?.categoryName}
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

export default CategoryPage;
