// client/src/components/categories/CategoryList.tsx
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
    <div className="p-4 bg-[#F5F7F8] rounded">
      <h2 className="text-xl text-[#495E57] mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center p-2 border-b border-[#45474B]">
            {editingId === category._id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="p-2 border border-[#45474B] rounded"
                />
                <button onClick={handleUpdateSubmit} className="ml-2 px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="ml-2 px-3 py-1 text-sm bg-gray-600 text-white rounded">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-[#495E57]">{category.categoryName}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleUpdateClick(category)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="ml-2 px-3 py-1 text-sm bg-red-600 text-white rounded"
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
