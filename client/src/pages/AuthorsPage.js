import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorForm from '../components/authors/AuthorForm';
import AuthorList from '../components/authors/AuthorList';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/authors`);
      setAuthors(response.data);
    } catch (error) {
      console.error("There was an error fetching the authors!", error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error("There was an error deleting the author!", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#495E57] mb-4">Manage Authors</h1>
      <AuthorForm fetchAuthors={fetchAuthors} />
      <AuthorList authors={authors} deleteAuthor={deleteAuthor} />
    </div>
  );
};

export default AuthorsPage;
