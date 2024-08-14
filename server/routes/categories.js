const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const categoryController = require('../controllers/categoryController');


// Create a new category
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;