import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Author } from '../types'; // Import the Author type from the shared file
import AuthorForm from '../components/authors/AuthorForm';
import AuthorList from '../components/authors/AuthorList';

const AuthorsPage: React.FC = () => {
  // Use the Author type for the state
  const [authors, setAuthors] = useState<Author[]>([]);

  // Fetch authors from the API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>(`${process.env.REACT_APP_API_BASE_URL}/authors`);
      setAuthors(response.data);
    } catch (error) {
      console.error("There was an error fetching the authors!", error);
    }
  };

  // Delete an author by ID
const deleteAuthor = async (id: string) => { // Change id type to string
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/authors/${id}`);
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
