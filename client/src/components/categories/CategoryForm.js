import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({ fetchCategories }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/categories`, { categoryName });
      fetchCategories();
      setCategoryName('');
    } catch (error) {
      console.error("There was an error creating the category!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#F5F7F8] rounded">
      <label className="block mb-2 text-[#495E57]">Category Name</label>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full p-2 mb-4 border border-[#45474B] rounded"
      />
      <button type="submit" className="px-4 py-2 bg-[#F4CE14] text-[#45474B] rounded">
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
