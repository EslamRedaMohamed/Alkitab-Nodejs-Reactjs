import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from '../../components/books/BookForm';
import BookList from '../../components/books/BookList';
import { Category, Author, Book } from '../../types';
import { useNavigate } from 'react-router-dom';

//changed

const BooksPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>('http://localhost:8080/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:8080/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>('http://localhost:8080/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchAuthors();
  }, []);

  const addOrUpdateBook = async (book: Book, photo?: File) => {
    try {
      const formData = new FormData();
      formData.append('name', book.name);
      formData.append('categoryName', book.categoryName);
      formData.append('authorName', book.authorName);
      formData.append('description', book.description || '');
      if (photo) formData.append('photo', photo);

      if (book._id) {
        await axios.put(`http://localhost:8080/books/${book._id}`, formData);
      } else {
        await axios.post('http://localhost:8080/books', formData);
      }

      fetchBooks();
      setEditingBook(null); // Reset editing book
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-[#495E57] mb-6">Manage Books</h1>
      <BookForm
        onSubmit={addOrUpdateBook}
        onCancel={() => setEditingBook(null)}
        categories={categories}
        authors={authors}
        bookToEdit={editingBook || undefined}
      />
      <div className="mt-6">
        <BookList
          books={books}
          deleteBook={deleteBook}
          updateBook={setEditingBook}
          categories={categories}
          authors={authors}
        />
      </div>
    </div>
  );
};

export default BooksPage;
