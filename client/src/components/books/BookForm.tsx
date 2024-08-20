import React, { useState } from 'react';
import axios from 'axios';
import { Category, Author } from '../../types';

interface BookFormProps {
  fetchBooks: () => void;
  categories: Category[];
  authors: Author[];
}

const BookForm: React.FC<BookFormProps> = ({ fetchBooks, categories, authors }) => {
  const [name, setName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryName || !authorName || !photo) {
      setError('Please complete all fields and upload a photo.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('categoryName', categoryName);
    formData.append('authorName', authorName);
    if (photo) formData.append('photo', photo);

    try {
      await axios.post('http://localhost:8080/books', formData);
      fetchBooks();
      setName('');
      setCategoryName('');
      setAuthorName('');
      setPhoto(null);
    } catch (error) {
      console.error('There was an error creating the book!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-[#F5F7F8] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#495E57] mb-4">Add New Book</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <label className="block mb-2 text-[#495E57]">Book Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      />
      <label className="block mb-2 text-[#495E57]">Category</label>
      <select
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.categoryName}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <label className="block mb-2 text-[#495E57]">Author</label>
      <select
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      >
        <option value="">Select an author</option>
        {authors.map((author) => (
          <option key={author._id} value={author.fullName}>
            {author.fullName}
          </option>
        ))}
      </select>
      <label className="block mb-2 text-[#495E57]">Photo</label>
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      />
      <button type="submit" className="px-6 py-2 bg-[#F4CE14] text-[#45474B] rounded-md hover:bg-[#d4b514] transition">
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
