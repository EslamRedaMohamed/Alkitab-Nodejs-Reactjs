import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from '../../components/books/BookForm';
import BookList from '../../components/books/BookList';
import { Category, Author, Book } from '../../types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BooksPage: React.FC = () => {
  const navigate = useNavigate(); // Correctly use `useNavigate` inside the component

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login'); // Redirect to login page if token doesn't exist
    }
  }, [navigate]); // Depend on navigate

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

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

  const addBook = async (book: Book, photo?: File) => {
    try {
      const formData = new FormData();
      formData.append('name', book.name);
      formData.append('categoryName', book.categoryName);
      formData.append('authorName', book.authorName);
      formData.append('description', book.description);
      if (photo) {
        formData.append('photo', photo);
      }
      const response = await axios.post<Book>('http://localhost:8080/books', formData);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const updateBook = async (book: Book, photo?: File) => {
    try {
      const formData = new FormData();
      formData.append('name', book.name);
      formData.append('categoryName', book.categoryName);
      formData.append('authorName', book.authorName);
      formData.append('description', book.description);
      if (photo) {
        formData.append('photo', photo);
      }
      await axios.put(`http://localhost:8080/books/${book._id}`, formData);
      setBooks(books.map(b => (b._id === book._id ? { ...b, ...book, photo: book.photo || b.photo } : b)));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchAuthors();
  }, []);

  // Conditional rendering to avoid rendering page content if redirected
  if (!localStorage.getItem('token')) {
    return null; // Do not render the page content
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-[#495E57] mb-6">Manage Books</h1>
      <BookForm onSubmit={addBook} onCancel={() => {}} categories={categories} authors={authors} />
      <div className="mt-6">
        <BookList books={books} deleteBook={deleteBook} updateBook={updateBook} categories={categories} authors={authors} />
      </div>
    </div>
  );
};

export default BooksPage;
