const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    photo: {
        type: String,
    },
});

module.exports = mongoose.model("Author", AuthorSchema);