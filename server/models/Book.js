const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    photo: String,
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
});

module.exports = mongoose.model('Book', bookSchema);