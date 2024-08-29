import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Author } from '../../types';

interface AuthorFormProps {
  fetchAuthors: () => void;
  editingAuthor: Author | null; 
  setEditingAuthor: (author: Author | null) => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ fetchAuthors, editingAuthor, setEditingAuthor }) => {
  const [fullName, setFullName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (editingAuthor) {
      setFullName(editingAuthor.fullName);
      setDateOfBirth(editingAuthor.dateOfBirth ? new Date(editingAuthor.dateOfBirth).toISOString().split('T')[0] : '');
      setPhoto(null); // Reset photo as it requires a file upload
    } else {
      setFullName('');
      setDateOfBirth('');
      setPhoto(null);
    }
  }, [editingAuthor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !dateOfBirth || !photo) {
      setError('Please complete all the information before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('dateOfBirth', dateOfBirth);
    if (photo) formData.append('photo', photo);

    try {
      if (editingAuthor) {
        await axios.put(`${import.meta.env.VITE_API_URL}/authors/${editingAuthor._id}`, formData);
        setEditingAuthor(null); // Reset editing state after update
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/authors`, formData);
      }
      fetchAuthors(); // Refresh the author list
      setFullName('');
      setDateOfBirth('');
      setPhoto(null);
      setError('');
    } catch (error) {
      console.error("There was an error creating or updating the author!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#F5F7F8] rounded">
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <label className="block mb-2 text-[#495E57]">Full Name</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      />
      <label className="block mb-2 text-[#495E57]">Date of Birth</label>
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      />
      <label className="block mb-2 text-[#495E57]">Photo</label>
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      />
      <button type="submit" className="px-4 py-2 bg-[#F4CE14] text-[#45474B] rounded">
        {editingAuthor ? 'Update Author' : 'Add Author'}
      </button>
    </form>
  );
};

export default AuthorForm;
