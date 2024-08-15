// const Book = require('../models/Book');
// const Author = require('../models/Author');
// const Category = require('../models/Category');
const User = require("../models/User");

const search = async (req, res) => {
  try {
    const { query } = req.query;
    // Backend example
    console.log("Received query:", query);

    // const books = await Book.find({ title: { $regex: query, $options: 'i' } });
    // const authors = await Author.find({ name: { $regex: query, $options: 'i' } });
    // const categories = await Category.find({ name: { $regex: query, $options: 'i' } });

    const users = await User.find({
      firstName: { $regex: query, $options: "i" },
    });

    // If nothing is found
    // if (!books.length && !authors.length && !categories.length)
    if (!users.length) {
      return res.status(404).json({ message: "No results found" });
    }
    // res.json({ books, authors, categories });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching search results" });
  }
};

module.exports = { search };
