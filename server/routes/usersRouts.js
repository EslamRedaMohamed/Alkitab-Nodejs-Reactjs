const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Get books with pagination
router.get("/books", usersController.getBooks);

// Get categories
router.get("/categories", usersController.getCategories);

// Get books by category with pagination
router.get("/books-by-category", usersController.getBooksByCategory);

module.exports = router;
