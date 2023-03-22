 const mongoose = require('mongoose');

 const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array
    },
    likes: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

 },{timestamps: true}) 
 
 const artModel = mongoose.model('art', Schema)
 module.exports = artModel