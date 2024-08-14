const Category = require("../models/Category");

exports.createCategory = async(req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.getCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.updateCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(category);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.deleteCategory = async(req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: "Category removed" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};