import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row, Typography } from "antd";
import "./SearchResult.css";

const { Title } = Typography;

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleCardClick = (type: string, id: string) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="results">
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
                          src={`http://localhost:8080/${book.photo}`}
                          style={{ height: 600 }}
                        />
                      }
                      onClick={() => handleCardClick("Books", book._id)}
                    >
                      <Card.Meta
                        title={book.name}
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
                          alt={author.fullName}
                          src={`http://localhost:8080/${author.photo}`}
                          style={{ height: 450 }}
                        />
                      }
                      onClick={() => handleCardClick("authors", author._id)}
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
                    <Card
                      hoverable
                      onClick={() =>
                        handleCardClick("categories", category._id)
                      }
                    >
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
