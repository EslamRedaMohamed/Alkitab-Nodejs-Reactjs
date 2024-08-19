import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from '../../components/books/BookForm';
import BookList from '../../components/books/BookList';

interface Category {
  _id: string;
  categoryName: string;
}

interface Author {
  _id: string;
  fullName: string;
}

interface Book {
  _id: string;
  name: string;
  categoryName: string;
  authorName: string;
  photo?: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`http://localhost:8080/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(`http://localhost:8080/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>(`http://localhost:8080/authors`);
      setAuthors(response.data);
    } catch (error) {
      console.error("There was an error fetching the authors!", error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("There was an error deleting the book!", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchAuthors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#495E57] mb-4">Manage Books</h1>
      <BookForm fetchBooks={fetchBooks} categories={categories} authors={authors} />
      <BookList books={books} deleteBook={deleteBook} />
    </div>
  );
};

export default BooksPage;
