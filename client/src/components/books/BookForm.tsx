import React, { useState, useEffect } from 'react';
import { Category, Author, Book } from '../../types';

//changed


interface BookFormProps {
  onSubmit: (book: Book, photo?: File) => void;
  onCancel: () => void;
  categories: Category[];
  authors: Author[];
  bookToEdit?: Book;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, onCancel, categories, authors, bookToEdit }) => {
  const [name, setName] = useState<string>(bookToEdit?.name || '');
  const [categoryName, setCategoryName] = useState<string>(bookToEdit?.categoryName || '');
  const [authorName, setAuthorName] = useState<string>(bookToEdit?.authorName || '');
  const [description, setDescription] = useState<string>(bookToEdit?.description || '');
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    if (bookToEdit) {
      setName(bookToEdit.name);
      setCategoryName(bookToEdit.categoryName);
      setAuthorName(bookToEdit.authorName);
      setDescription(bookToEdit.description || '');
    } else {
      setName('');
      setCategoryName('');
      setAuthorName('');
      setDescription('');
      setPhoto(null);
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookData: Book = {
      _id: bookToEdit?._id,
      name,
      categoryName,
      authorName,
      description,
      photo: bookToEdit?.photo,
    };

    onSubmit(bookData, photo || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-[#F5F7F8] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#495E57] mb-4">
        {bookToEdit ? 'Update Book' : 'Add New Book'}
      </h2>
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
      <label className="block mb-2 text-[#495E57]">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
        rows={5}
        placeholder="Enter the book description"
      />
      <div className="flex space-x-4">
        <button type="submit" className="px-6 py-2 bg-[#F4CE14] text-[#45474B] rounded-md hover:bg-[#d4b514] transition">
          {bookToEdit ? 'Save Changes' : 'Add Book'}
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;
