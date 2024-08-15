// components/common/SearchBar.tsx
import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const { Search } = Input;

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?query=${value}`);
    }
  };
  return (
    <div style={{ width: 400 }}>
      <Search
        placeholder="Search for books, authors, categories"
        enterButton={
          <Button
            type="primary"
            style={{
              backgroundColor: "var(--primary)",
              borderColor: "var(--yellow)",
            }}
          >
            Search
          </Button>
        }
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={onSearch}
      />
    </div>
  );
};

export default SearchBar;
