import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Author } from '../../types'; // Import the Author type from the shared file
import AuthorForm from '../../components/authors/AuthorForm';
import AuthorList from '../../components/authors/AuthorList';

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login'); // Redirect to login page
    } else {
      fetchAuthors(); // Fetch authors if token exists
    }
  }, [navigate]); // Depend on navigate

  // Fetch authors from the API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>('http://localhost:8080/authors/');
      setAuthors(response.data);
    } catch (error) {
      console.error("There was an error fetching the authors!", error);
    }
  };

  // Delete an author by ID
  const deleteAuthor = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error("There was an error deleting the author!", error);
    }
  };

  // Conditional rendering to avoid rendering page content if redirected
  if (!localStorage.getItem('token')) {
    return null; // Do not render the page content
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#495E57] mb-4">Manage Authors</h1>
      <AuthorForm fetchAuthors={fetchAuthors} />
      <AuthorList authors={authors} deleteAuthor={deleteAuthor} />
    </div>
  );
};

export default AuthorsPage;
