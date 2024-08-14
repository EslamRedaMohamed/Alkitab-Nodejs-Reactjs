const Book = require('../models/Book');

// Create Book
const createBook = async(req, res) => {
    try {
        const bookData = {
            name: req.body.name,
            categoryName: req.body.categoryName,
            authorName: req.body.authorName,
            photo: req.file ? req.file.path : req.body.photo // Handle file upload
        };

        const book = new Book(bookData);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Books
const getBooks = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get book by id
const getBooksById = async(req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Book
const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req.file) updates.photo = req.file.path; // Handle file upload

        const book = await Book.findByIdAndUpdate(id, updates, { new: true });
        if (!book) return res.status(404).json({ error: 'Book not found' });

        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Book
const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
    getBooksById,
};
