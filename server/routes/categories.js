const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const usersController = require("../controllers/usersController");
const roleMiddleware = require('./../middlewares/roleMiddleware');

// Create a new category
router.post("/", roleMiddleware, categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:id", roleMiddleware, categoryController.updateCategory);
router.delete("/:id", roleMiddleware, categoryController.deleteCategory);

// Get author by id
router.get("/:id", usersController.getCategoryById);

module.exports = router;
