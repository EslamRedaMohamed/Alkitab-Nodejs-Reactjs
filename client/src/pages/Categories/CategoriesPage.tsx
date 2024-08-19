import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Pagination } from "antd";
import axios from "axios";
import "./CategoriesPage.css";

const { Title } = Typography;

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Helper function to build the URL
  const buildBooksUrl = (categoryName: string, page: number) => {
    return `http://localhost:8080/user/books-by-category?category=${categoryName}&page=${page}&limit=8`;
  };

  useEffect(() => {
    // Fetch categories on component mount
    axios.get("http://localhost:8080/user/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Fetch books for the selected category using the helper function
    axios.get(buildBooksUrl(categoryName, currentPage)).then((response) => {
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    });
  };

  useEffect(() => {
    if (selectedCategory) {
      // Fetch books whenever the selected category or current page changes
      axios
        .get(buildBooksUrl(selectedCategory, currentPage))
        .then((response) => {
          setBooks(response.data.books);
          setTotalPages(response.data.totalPages);
        });
    }
  }, [selectedCategory, currentPage]);

  return (
    <div className="categories">
      <Title level={2}>Categories</Title>
      <Row gutter={16}>
        {categories.map((category) => (
          <Col span={6} key={category._id}>
            <Card
              hoverable
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              <Card.Meta title={category.categoryName} />
            </Card>
          </Col>
        ))}
      </Row>

      {selectedCategory && (
        <div className="books">
          <Title level={3}>Books in {selectedCategory}</Title>
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
      )}
    </div>
  );
};

export default CategoriesPage;
