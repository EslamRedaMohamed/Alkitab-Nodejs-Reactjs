import React, { useState } from 'react';
import axios from 'axios';

const AuthorForm = ({ fetchAuthors }) => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('dateOfBirth', dateOfBirth);
    if (photo) formData.append('photo', photo);

    try {
      await axios.post(`http://localhost:8080/authors`, formData);
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
        onChange={(e) => setPhoto(e.target.files[0])}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      />
      <button type="submit" className="px-4 py-2 bg-[#F4CE14] text-[#45474B] rounded">
        Add Author
      </button>
    </form>
  );
};

export default AuthorForm;
