import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Author } from '../../types';
import AuthorForm from '../../components/authors/AuthorForm';
import AuthorList from '../../components/authors/AuthorList';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const navigate = useNavigate(); // Correctly use `useNavigate` within the component

  // Fetch authors from the API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>('http://localhost:8080/authors/');
      setAuthors(response.data);
    } catch (error) {
      console.error("There was an error fetching the authors!", error);
    }
  };

  // Delete an author and refresh the list
  const deleteAuthor = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/authors/${id}`);
      fetchAuthors(); // Refresh the list after deleting an author
    } catch (error) {
      console.error("There was an error deleting the author!", error);
    }
  };

  // Set the author to be edited
  const updateAuthor = (author: Author) => {
    setEditingAuthor(author); // Open the form with the author's data for editing
  };

  // Redirect to login if token doesn't exist
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login'); // Redirect to login page if token doesn't exist
    }
  }, [navigate]); // Depend on navigate

  useEffect(() => {
    fetchAuthors(); // Fetch the authors on component mount
  }, []);
  // Conditional rendering to avoid rendering page content if redirected
  if (!localStorage.getItem('token')) {
    return null; // Do not render the page content
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#495E57] mb-4">Manage Authors</h1>
      <AuthorForm fetchAuthors={fetchAuthors} editingAuthor={editingAuthor} setEditingAuthor={setEditingAuthor} />
      <AuthorList authors={authors} deleteAuthor={deleteAuthor} updateAuthor={updateAuthor} />
    </div>
  );
};

export default AuthorsPage;
