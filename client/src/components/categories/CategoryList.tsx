import React, { useState } from 'react';

interface Category {
  _id: string;
  categoryName: string;
}

interface CategoryListProps {
  categories: Category[];
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, newCategoryName: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, deleteCategory, updateCategory }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  const handleUpdateClick = (category: Category) => {
    setEditingId(category._id);
    setNewCategoryName(category.categoryName);
  };

  const handleUpdateSubmit = () => {
    if (editingId) {
      updateCategory(editingId, newCategoryName);
      setEditingId(null);
      setNewCategoryName('');
    }
  };

  return (
    <div className="p-6 bg-[#F5F7F8] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#495E57] mb-6">Categories</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category._id} className="flex items-center justify-between p-4 bg-white border border-[#E0E0E0] rounded-lg shadow-sm">
            {editingId === category._id ? (
              <div className="flex items-center w-full space-x-4">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="p-2 border border-[#45474B] rounded-md w-full"
                />
                <button
                  onClick={handleUpdateSubmit}
                  className="px-4 py-2 bg-[#495E57] text-white rounded-md hover:bg-[#36454F] transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center w-full space-x-4">
                  <p className="text-lg font-medium text-[#495E57]">{category.categoryName}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdateClick(category)}
                    className="px-4 py-2 bg-[#45474B] text-white rounded-md hover:bg-[#333] transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
