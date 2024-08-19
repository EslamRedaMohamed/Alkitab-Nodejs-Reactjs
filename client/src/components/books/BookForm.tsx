import React, { useState } from 'react';
import axios from 'axios';

interface Category {
  _id: string;
  categoryName: string;
}

interface Author {
  _id: string;
  fullName: string;
}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('categoryName', categoryName);
    formData.append('authorName', authorName);
    if (photo) formData.append('photo', photo);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/books`, formData);
      fetchBooks();
      setName('');
      setCategoryName('');
      setAuthorName('');
      setPhoto(null);
    } catch (error) {
      console.error("There was an error creating the book!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#F5F7F8] rounded">
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
      <button type="submit" className="px-4 py-2 bg-[#F4CE14] text-[#45474B] rounded">
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
