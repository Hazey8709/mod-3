const mongoose = require("mongoose");

const nameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
});

module.exports = mongoose.model("Name", nameSchema);
