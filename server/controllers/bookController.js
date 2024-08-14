const Book = require('../models/Book');

// Create Book
const createBook = async(req, res) => {
    try {
        const book = new Book({...req.body, photo: req.file.path });
        await book.save();
        res.status(201).send(book);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Get All Books
const getBooks = async(req, res) => {
    try {
        const books = await Book.find().populate('categoryId').populate('authorId');
        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update Book
const updateBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send();

        if (req.file) book.photo = req.file.path;
        Object.assign(book, req.body);
        await book.save();

        res.send(book);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete Book
const deleteBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send();
        res.send(book);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
};