const Book = require("../models/Book");
const Author = require("../models/Author");
const Category = require("../models/Category");

const search = async (req, res) => {
  try {
    const { query } = req.query;
    // Backend example
    console.log("Received query:", query);

    const books = await Book.find({ name: { $regex: query, $options: "i" } });
    const authors = await Author.find({
      fullName: { $regex: query, $options: "i" },
    });
    const categories = await Category.find({
      categoryName: { $regex: query, $options: "i" },
    });

    // If nothing is found
    if (!books.length && !authors.length && !categories.length) {
      return res.status(404).json({ message: "No results found" });
    }
    res.json({ books, authors, categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching search results" });
  }
};

module.exports = { search };
