const Book = require("../models/Book");

exports.createBook = async(req, res) => {
    try {
        const { name, categoryid, authorid } = req.body;
        const book = new Book({
            name,
            categoryid,
            authorid,
            photo: req.file ? req.file.path : "",
        });
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.getBooks = async(req, res) => {
    try {
        const books = await Book.find().populate("categoryid").populate("authorid");
        res.json(books);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.updateBook = async(req, res) => {
    try {
        const { name, categoryid, authorid } = req.body;
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ msg: "Book not found" });

        book.name = name;
        book.categoryid = categoryid;
        book.authorid = authorid;
        if (req.file) book.photo = req.file.path;

        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.deleteBook = async(req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ msg: "Book removed" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};