

const mongoose = require('mongoose')
// comment schema
const Comment = new mongoose.Schema({
    text: {
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
    collectionName: {  
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }
}) 
const CommentModel = mongoose.model('comments', Comment)

module.exports =  CommentModel       