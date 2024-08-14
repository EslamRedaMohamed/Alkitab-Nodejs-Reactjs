const Author = require("../models/Author");

exports.createAuthor = async(req, res) => {
    try {
        const { fullname, dateOfBirth } = req.body;
        const author = new Author({
            fullname,
            dateOfBirth,
            photo: req.file ? req.file.path : "",
        });
        await author.save();
        res.json(author);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.getAuthors = async(req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.updateAuthor = async(req, res) => {
    try {
        const { fullname, dateOfBirth } = req.body;
        const author = await Author.findById(req.params.id);

        if (!author) return res.status(404).json({ msg: "Author not found" });

        author.fullname = fullname;
        author.dateOfBirth = dateOfBirth;
        if (req.file) author.photo = req.file.path;

        await author.save();
        res.json(author);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.deleteAuthor = async(req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.json({ msg: "Author removed" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};