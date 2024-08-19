import React, { useState } from 'react';
import axios from 'axios';

interface AuthorFormProps {
  fetchAuthors: () => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ fetchAuthors }) => {
  const [fullName, setFullName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('dateOfBirth', dateOfBirth);
    if (photo) formData.append('photo', photo);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/authors`, formData);
      fetchAuthors();
      setFullName('');
      setDateOfBirth('');
      setPhoto(null);
    } catch (error) {
      console.error("There was an error creating the author!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#F5F7F8] rounded">
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
        Add Author
      </button>
    </form>
  );
};

export default AuthorForm;
