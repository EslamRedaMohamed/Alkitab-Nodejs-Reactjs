import React from 'react';

const CategoryList = ({ categories, deleteCategory }) => {
  return (
    <div className="p-4 bg-[#F5F7F8] rounded">
      <h2 className="text-xl text-[#495E57] mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center p-2 border-b border-[#45474B]">
            {category.categoryName}
            <button
              onClick={() => deleteCategory(category._id)}
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

export default CategoryList;
