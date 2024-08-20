const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { route } = require("./userRouts");

// Get books with pagination
router.get("/books", usersController.getBooks);

// Get categories
router.get("/categories", usersController.getCategories);

// Get books by category with pagination
router.get("/books-by-category", usersController.getBooksByCategory);

// Get Authors
router.get("/authors", usersController.getAuthors);

// Get books by author name with pagination
router.get("/books-by-author", usersController.getBooksByAuthor);

module.exports = router;
