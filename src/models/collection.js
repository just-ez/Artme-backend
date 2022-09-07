 const mongoose = require('mongoose');

 const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    Image: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

 },{timestamps: true}) 
 
 const CollectionModel = mongoose.model('collection', Schema)
 module.exports = CollectionModel