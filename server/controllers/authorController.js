const Author = require('../models/Author');

// Create Author
const createAuthor = async(req, res) => {
    try {
        const author = new Author({...req.body, photo: req.file.path });
        await author.save();
        res.status(201).send(author);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Get All Authors
const getAuthors = async(req, res) => {
    try {
        const authors = await Author.find();
        res.send(authors);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update Author
const updateAuthor = async(req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).send();

        if (req.file) author.photo = req.file.path;
        Object.assign(author, req.body);
        await author.save();

        res.send(author);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete Author
const deleteAuthor = async(req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).send();
        res.send(author);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor,
};