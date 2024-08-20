import React, { useState } from 'react';
import { Book, Category, Author } from '../../types';
import BookForm from './BookForm';

interface BookListProps {
  books: Book[];
  deleteBook: (id: string) => void;
  updateBook: (book: Book, photo?: File) => void;
  categories: Category[];
  authors: Author[];
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook, updateBook, categories, authors }) => {
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleUpdateClick = (book: Book) => {
    setEditingBook(book);
  };

  const handleFormSubmit = (book: Book, photo?: File) => {
    updateBook(book, photo);
    setEditingBook(null);
  };

  const handleCancel = () => {
    setEditingBook(null);
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
                onClick={() => deleteBook(book._id!)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingBook && (
        <div className="mt-6">
          <BookForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            categories={categories}
            authors={authors}
            bookToEdit={editingBook}
          />
        </div>
      )}
    </div>
  );
};

export default BookList;
