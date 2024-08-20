import React from 'react';
import { Author } from '../../types'; // Adjust the path as necessary

interface AuthorListProps {
  authors: Author[];
  deleteAuthor: (id: string) => void;
  updateAuthor: (author: Author) => void; // Add this prop for updating the author
}

const AuthorList: React.FC<AuthorListProps> = ({ authors, deleteAuthor, updateAuthor }) => {
  return (
    <div className="p-4 bg-[#F5F7F8] rounded">
      <h2 className="text-xl text-[#495E57] mb-4">Authors</h2>
      <ul className="space-y-4">
        {authors.map((author) => (
          <li key={author._id} className="flex justify-between items-center p-4 border border-[#45474B] rounded bg-white">
            <div className="flex items-center space-x-4">
              {author.photo && (
                <img
                  src={`http://localhost:8080/${author.photo}`} // Adjust the path if needed
                  alt={author.fullName}
                  className="w-16 h-16 object-cover rounded-full border border-[#45474B]"
                />
              )}
              <div>
                <p className="text-lg font-semibold text-[#495E57]">{author.fullName}</p>
                <p className="text-sm text-[#45474B]">{author.dateOfBirth ? new Date(author.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => updateAuthor(author)}
                className="px-3 py-1 text-sm bg-[#45474B] text-[#ffffff] rounded hover:bg-[#d4b514] transition"
              >
                Update
              </button>
              <button
                onClick={() => deleteAuthor(author._id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
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
