import React from 'react';

const AuthorList = ({ authors, deleteAuthor }) => {
  return (
    <div className="p-4 bg-[#F5F7F8] rounded">
      <h2 className="text-xl text-[#495E57] mb-4">Authors</h2>
      <ul className="space-y-2">
        {authors.map((author) => (
          <li key={author._id} className="flex justify-between items-center p-2 border-b border-[#45474B]">
            <div>
              <p className="text-[#495E57]">{author.fullName}</p>
              <p className="text-sm text-[#45474B]">{author.dateOfBirth}</p>
            </div>
            <button
              onClick={() => deleteAuthor(author._id)}
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

export default AuthorList;
