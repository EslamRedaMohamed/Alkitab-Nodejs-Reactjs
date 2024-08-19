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
  // TODO: Implement pagination for authors and add search functionality.
  // const { page = 1, limit = 10 } = req.query;
  // const authors = await Author.find()
  //  .limit(limit * 1)
  //  .skip((page - 1) * limit);
  // const count = await Author.countDocuments();
  // res.json({
  //   authors,
  //   totalPages: Math.ceil(count / limit),
  //   currentPage: page,
  // });
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
  // TODO: Implement pagination for books by author and add search functionality.
  // const { page = 1, limit = 10 } = req.query;
  // const books = await Book.find({ authorName: author })
  //  .limit(limit * 1)
  //
};

module.exports = {
  getBooks,
  getCategories,
  getBooksByCategory,
  getAuthors,
  getBooksByAuthor,
};
