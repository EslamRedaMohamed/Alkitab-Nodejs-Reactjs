import React, { useState } from 'react';
import { Book } from '../../types';

interface BookListProps {
  books: Book[];
  deleteBook: (id: string) => void;
  updateBook: (book: Book, photo?: File) => void; // Adjusted the type signature
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook, updateBook }) => {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [updatedName, setUpdatedName] = useState<string>('');
  const [updatedCategory, setUpdatedCategory] = useState<string>('');
  const [updatedAuthor, setUpdatedAuthor] = useState<string>('');
  const [updatedPhoto, setUpdatedPhoto] = useState<File | null>(null);

  const handleUpdateClick = (book: Book) => {
    setEditingBook(book);
    setUpdatedName(book.name);
    setUpdatedCategory(book.categoryName);
    setUpdatedAuthor(book.authorName);
  };

  const handleUpdateSubmit = async () => {
    if (editingBook) {
      if (updatedPhoto) {
        // Handle file upload with FormData
        const formData = new FormData();
        formData.append('name', updatedName);
        formData.append('categoryName', updatedCategory);
        formData.append('authorName', updatedAuthor);
        formData.append('photo', updatedPhoto);
        await updateBook(editingBook, updatedPhoto);
      } else {
        // Handle update without file
        const updatedBook = { ...editingBook, name: updatedName, categoryName: updatedCategory, authorName: updatedAuthor };
        await updateBook(updatedBook);
      }
      setEditingBook(null);
      setUpdatedName('');
      setUpdatedCategory('');
      setUpdatedAuthor('');
      setUpdatedPhoto(null);
    }
  };

  return (
    <div className="p-6 bg-[#F5F7F8] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#495E57] mb-6">Books</h2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book._id} className="flex items-center justify-between p-4 bg-white border border-[#E0E0E0] rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              {book.photo && (
                <img
                  src={`http://localhost:8080/${book.photo}`}
                  alt={book.name}
                  className="w-24 h-24 object-cover rounded-md border border-[#45474B]"
                />
              )}
              <div>
                <p className="text-lg font-medium text-[#495E57]">{book.name}</p>
                <p className="text-sm text-[#45474B]">{book.categoryName} - {book.authorName}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleUpdateClick(book)}
                className="px-4 py-2 bg-[#495E57] text-white rounded-md hover:bg-[#36454F] transition"
              >
                Update
              </button>
              <button
                onClick={() => deleteBook(book._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingBook && (
        <div className="mt-6 p-4 bg-white border border-[#E0E0E0] rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-[#495E57] mb-4">Update Book</h3>
          <label className="block mb-2 text-[#495E57]">Book Name</label>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="w-full p-2 mb-4 border border-[#45474B] rounded"
            placeholder="Book Name"
          />
          <label className="block mb-2 text-[#495E57]">Category</label>
          <input
            type="text"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-[#45474B] rounded"
            placeholder="Category"
          />
          <label className="block mb-2 text-[#495E57]">Author</label>
          <input
            type="text"
            value={updatedAuthor}
            onChange={(e) => setUpdatedAuthor(e.target.value)}
            className="w-full p-2 mb-4 border border-[#45474B] rounded"
            placeholder="Author"
          />
          <label className="block mb-2 text-[#495E57]">Photo</label>
          <input
            type="file"
            onChange={(e) => setUpdatedPhoto(e.target.files?.[0] || null)}
            className="w-full p-2 mb-4 border border-[#45474B] rounded"
          />
          <button
            onClick={handleUpdateSubmit}
            className="px-6 py-2 bg-[#495E57] text-white rounded-md hover:bg-[#36454F] transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingBook(null)}
            className="ml-4 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
