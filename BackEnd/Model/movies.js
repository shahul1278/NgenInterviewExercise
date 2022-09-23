const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const movieSchema = new Schema({
    Title: {
        required: true,
        type: String
    },
    Year : {
        required: true,
        type: Number
    },
    Director: {
        required: true,
        type: String
    }},

)
module.exports = mongoose.model("movies", movieSchema);
