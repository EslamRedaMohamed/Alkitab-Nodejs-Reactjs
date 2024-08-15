// pages/SearchResults/SearchResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<any>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      console.log("Search term in frontend:", query);

      axios
        .get(`http://localhost:8080/search/search?query=${query}`)
        .then((response) => {
          console.log("API response", response.data); // Check the response here
          setResults(response.data);
        });
    }
  }, [query]);

  return (
    <div>
      <Title level={2}>Search Results for "{query}"</Title>

      {results && (
        <div>
          {/* Render Books section if data exists */}
          {results.books && results.books.length > 0 && (
            <>
              <Title level={3}>Books</Title>
              <Row gutter={16}>
                {results.books.map((book: any) => (
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
                      <Card.Meta
                        title={book.name}
                        description={book.authorName} // book.categoryName
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {/* Render Authors section if data exists */}
          {results.authors && results.authors.length > 0 && (
            <>
              <Title level={3}>Authors</Title>
              <Row gutter={16}>
                {results.authors.map((author: any) => (
                  <Col span={6} key={author._id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={author.fullName}
                          src={
                            // author.photo ||
                            "https://iopenatheclose.wordpress.com/wp-content/uploads/2012/11/jk-rowling-author-photo-harry-potter-and-the-deathly-hallows-book-cover-photo.jpg"
                          }
                        />
                      }
                    >
                      <Card.Meta title={author.fullName} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {/* Render Categories section if data exists */}
          {results.categories && results.categories.length > 0 && (
            <>
              <Title level={3}>Categories</Title>
              <Row gutter={16}>
                {results.categories.map((category: any) => (
                  <Col span={6} key={category._id}>
                    <Card hoverable>
                      <Card.Meta title={category.categoryName} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
