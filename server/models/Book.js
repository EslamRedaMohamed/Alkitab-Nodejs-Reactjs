const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    photo: String,
    name: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Book', bookSchema);