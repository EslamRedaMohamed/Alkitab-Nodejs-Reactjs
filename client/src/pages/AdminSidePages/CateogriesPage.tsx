import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CategoryForm from '../../components/categories/CategoryForm';
import CategoryList from '../../components/categories/CategoryList';

interface Category {
  _id: string;
  categoryName: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate inside the component

  // Redirect to login if token doesn't exist
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login'); // Redirect to login page
    }
  }, [navigate]); // Depend on navigate
  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(`${import.meta.env.VITE_API_URL}/categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("There was an error deleting the category!", error);
    }
  };

  const updateCategory = async (id: string, newCategoryName: string) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/categories/${id}`, { categoryName: newCategoryName });
      fetchCategories();
    } catch (error) {
      console.error("There was an error updating the category!", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Conditional rendering to avoid rendering page content if redirected
  if (!localStorage.getItem('token')) {
    return null; // Do not render the page content
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#495E57] mb-4">Manage Categories</h1>
      <CategoryForm fetchCategories={fetchCategories} />
      <CategoryList categories={categories} deleteCategory={deleteCategory} updateCategory={updateCategory} />
    </div>
  );
};

export default CategoriesPage;
