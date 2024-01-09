const mongoose = require('mongoose');

const Book = mongoose.model('Book', {
    title: String,
    description: String,
    pageCount: Number,
});

module.exports = Book;