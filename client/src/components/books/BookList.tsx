import React from 'react';

interface Book {
  _id: string;
  name: string;
  categoryName: string;
  authorName: string;
}

interface BookListProps {
  books: Book[];
  deleteBook: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook }) => {
  return (
    <div className="p-4 bg-[#F5F7F8] rounded">
      <h2 className="text-xl text-[#495E57] mb-4">Books</h2>
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book._id} className="flex justify-between items-center p-2 border-b border-[#45474B]">
            <div>
              <p className="text-[#495E57]">{book.name}</p>
              <p className="text-sm text-[#45474B]">{book.categoryName} - {book.authorName}</p>
            </div>
            <button
              onClick={() => deleteBook(book._id)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
