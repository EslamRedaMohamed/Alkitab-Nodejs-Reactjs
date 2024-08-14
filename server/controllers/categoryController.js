const Category = require('../models/Category');

// Create Category
const createCategory = async(req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Get All Categories
const getCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update Category
const updateCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).send();
        res.send(category);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete Category
const deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).send();
        res.send(category);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};