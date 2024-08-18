const { default: mongoose } = require('mongoose');
const Book = require('../models/Book');
const User = require('../models/User');

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

const bookAvgRate = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.aggregate([
            { $unwind: "$favourites" },
            { $match: { "favourites.book": new mongoose.Types.ObjectId(id) } }, // Use 'new' here
            { 
                $group: {
                    _id: "$favourites.book",
                    averageRating: { $avg: "$favourites.rate" }
                }
            }
        ]);

        if (result.length > 0) {
            return res.status(200).json({ averageRating: result[0].averageRating });
        } else {
            return res.status(404).json({ averageRating: 0 });
        }
    } catch (error) {
        console.error('Error calculating average rating:', error);
        return res.status(500).json({ error: 'An error occurred while calculating the average rating.' });
    }
};

module.exports = {

    createBook,
    getBooks,
    updateBook,
    deleteBook,
    getBooksById,
    bookAvgRate
};
