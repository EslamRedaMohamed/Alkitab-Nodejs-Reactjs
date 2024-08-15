// pages/SearchResults/SearchResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { List, Typography } from "antd";

const { Title } = Typography;

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<any>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  useEffect(() => {
    if (query) {
      // Frontend example
      console.log("Search term in frontend:", query);

      axios.get(`/api/search?query=${query}`).then((response) => {
        console.log("API response", response.data); // Check the response here
        setResults(response.data);
      });
    }
  }, [query]);

  return (
    <div>
      <Title level={2}>Search Results for "{query}"</Title>
      {results && (
        <>
          <List
            header={<Title level={3}>Books</Title>}
            dataSource={results.books}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
          <List
            header={<Title level={3}>Authors</Title>}
            dataSource={results.authors}
            renderItem={(item) => <List.Item>{item.name}</List.Item>}
          />
          <List
            header={<Title level={3}>Categories</Title>}
            dataSource={results.categories}
            renderItem={(item) => <List.Item>{item.name}</List.Item>}
          />
          <List
            header={<Title level={3}>Users</Title>}
            dataSource={results.users}
            renderItem={(item) => <List.Item>{item.name}</List.Item>}
          />
        </>
      )}
    </div>
  );
};

export default SearchResults;
