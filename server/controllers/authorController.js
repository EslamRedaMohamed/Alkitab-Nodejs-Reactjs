const Author = require('../models/Author');

// Create Author
const createAuthor = async(req, res) => {
    try {
        const authorData = {
            fullName: req.body.fullName,
            dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
            photo: req.file ? req.file.path : req.body.photo // Handle file upload
        };

        const author = new Author(authorData);
        await author.save();
        res.status(201).json(author);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Authors
const getAuthors = async(req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Author
const updateAuthor = async(req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req.file) updates.photo = req.file.path; // Handle file upload

        const author = await Author.findByIdAndUpdate(id, updates, { new: true });
        if (!author) return res.status(404).json({ error: 'Author not found' });

        res.status(200).json(author);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Author
const deleteAuthor = async(req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findByIdAndDelete(id);
        if (!author) return res.status(404).json({ error: 'Author not found' });

        res.status(200).json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor,
};
