import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Author } from '../../types';
import AuthorForm from '../../components/authors/AuthorForm';
import AuthorList from '../../components/authors/AuthorList';
import { useNavigate } from 'react-router-dom';

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const navigate = useNavigate();

  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>('http://localhost:8080/authors/');
      setAuthors(response.data);
    } catch (error) {
      console.error("There was an error fetching the authors!", error);
    }
  };

  const deleteAuthor = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/authors/${id}`);
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author._id !== id));
    } catch (error) {
      console.error("There was an error deleting the author!", error);
    }
  };

  const updateAuthor = (author: Author) => {
    setEditingAuthor(author);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  if (!localStorage.getItem('token')) {
    return null;
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
