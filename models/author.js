const mongoose = require("mongoose");
const Book = require("../routes/books");

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Book,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Author", authorSchema);
