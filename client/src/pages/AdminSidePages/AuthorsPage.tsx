import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Author } from '../../types';
import AuthorForm from '../../components/authors/AuthorForm';
import AuthorList from '../../components/authors/AuthorList';

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

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
      fetchAuthors();
    } catch (error) {
      console.error("There was an error deleting the author!", error);
    }
  };

  const updateAuthor = (author: Author) => {
    setEditingAuthor(author); // Set the author to be edited
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#495E57] mb-4">Manage Authors</h1>
      <AuthorForm fetchAuthors={fetchAuthors} />
      <AuthorList authors={authors} deleteAuthor={deleteAuthor} updateAuthor={updateAuthor} />
    </div>
  );
};

export default AuthorsPage;
