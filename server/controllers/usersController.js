const Book = require("../models/Book");
const Category = require("../models/Category");
const Author = require("../models/Author");

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

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors" });
  }
};

const getBooksByAuthor = async (req, res) => {
  try {
    const { author, page = 1, limit = 8 } = req.query;

    // Find books by author
    const books = await Book.find({ authorName: author })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Calculate total pages
    const totalBooks = await Book.countDocuments({ authorName: author });
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({ books, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author" });
  }
};

// Get Author by Id
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
    console.log("author from server: ", author);
  } catch (error) {
    res.status(500).json({ message: "Error fetching author" });
  }
};

// Get Category by Id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
    console.log("category from server: ", category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category" });
  }
};

module.exports = {
  getBooks,
  getCategories,
  getBooksByCategory,
  getAuthors,
  getBooksByAuthor,
  getAuthorById,
  getCategoryById,
};
