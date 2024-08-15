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
        .get(`http://localhost:8080/api/search?query=${query}`)
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
                          alt={book.title}
                          src={book.coverImage || "default-book-image-url"}
                        />
                      }
                    >
                      <Card.Meta
                        title={book.title}
                        description={book.authorName}
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
                          alt={author.name}
                          src={
                            author.profileImage || "default-author-image-url"
                          }
                        />
                      }
                    >
                      <Card.Meta title={author.name} />
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
                      <Card.Meta title={category.name} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {/* Render Users section if data exists */}
          {results.users && results.users.length > 0 && (
            <>
              <Title level={3}>Users</Title>
              <Row gutter={16}>
                {results.users.map((user: any) => (
                  <Col span={6} key={user._id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={user.firstName}
                          src={user.profileImage || "default-user-image-url"}
                        />
                      }
                    >
                      <Card.Meta title={user.firstName} />
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
