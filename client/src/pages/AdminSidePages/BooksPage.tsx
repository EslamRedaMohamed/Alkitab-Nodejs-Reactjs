import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from '../../components/books/BookForm';
import BookList from '../../components/books/BookList';
import { Category, Author, Book } from '../../types';
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.get<Book[]>(`${import.meta.env.VITE_API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(`${import.meta.env.VITE_API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>(`${import.meta.env.VITE_API_URL}/authors`);
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

      let updatedBooks;
      if (book._id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/books/${book._id}`, formData);
        updatedBooks = books.map((b) => (b._id === book._id ? { ...b, ...book, photo: book.photo } : b));
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/books`, formData);
        updatedBooks = [...books, response.data];
      }

      setBooks(updatedBooks); // Update the book list immediately
      setEditingBook(null); // Reset editing book
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`);
      setBooks(books.filter((book) => book._id !== id)); // Remove the book from the list immediately
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
