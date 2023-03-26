const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    name: { type: String, required: true },
    author: { type: String, required: true },
});

// const authorSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     book: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Book",
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     author: {
//         type: String,
//         required: true,
//     },
// });

module.exports = mongoose.model("Author", authorSchema);
