import React from 'react';
import { Author } from '../../types';

interface AuthorListProps {
  authors: Author[];
  deleteAuthor: (id: string) => void;
  updateAuthor: (author: Author) => void;
}

const AuthorList: React.FC<AuthorListProps> = ({ authors, deleteAuthor, updateAuthor }) => {
  return (
    <div className="p-6 bg-[#F5F7F8] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#495E57] mb-6">Authors</h2>
      <ul className="space-y-4">
        {authors.map((author) => (
          <li key={author._id} className="flex items-center justify-between p-4 bg-white border border-[#E0E0E0] rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              {author.photo && (
                <img
                  src={`http://localhost:8080/${author.photo}`}
                  alt={author.fullName}
                  className="w-16 h-16 object-cover rounded-full border border-[#45474B]"
                />
              )}
              <div>
                <p className="text-lg font-medium text-[#495E57]">{author.fullName}</p>
                <p className="text-sm text-[#45474B]">{author.dateOfBirth ? new Date(author.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => updateAuthor(author)}
                className="px-4 py-2 bg-[#495E57] text-white rounded-md hover:bg-[#36454F] transition"
              >
                Update
              </button>
              <button
                onClick={() => deleteAuthor(author._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
