const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
