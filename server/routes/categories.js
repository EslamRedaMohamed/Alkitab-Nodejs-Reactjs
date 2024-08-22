const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const categoryController = require("../controllers/categoryController");
const usersController = require("../controllers/usersController");

// Create a new category
router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

// Get author by id
router.get("/:id", usersController.getCategoryById);

module.exports = router;
