const Book = require("../models/Book");
const Category = require("../models/Category");

const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await Book.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Book.countDocuments();
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

const getBooksByCategory = async (req, res) => {
  try {
    const { category, page = 1, limit = 8 } = req.query;

    // Find books by category
    const books = await Book.find({ categoryName: category })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Calculate total pages
    const totalBooks = await Book.countDocuments({ categoryName: category });
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({ books, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by category" });
  }
};

module.exports = {
  getBooks,
  getCategories,
  getBooksByCategory,
};
