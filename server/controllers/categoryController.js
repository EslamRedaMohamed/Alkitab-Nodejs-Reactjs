const Category = require('../models/Category');

// Create Category
const createCategory = async(req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ error: 'categoryName is required' });
        }

        const newCategory = new Category({ categoryName });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Categories
const getCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Category
const updateCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Category
const deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
