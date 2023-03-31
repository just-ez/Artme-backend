

const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    text: {
        type: String,
         required: true
       },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    docId: {  
        type: mongoose.Types.ObjectId,
        refPath: 'docModel'
    },
    docModel: {
        type: String,
        enum: ["post", "art", "collection"],
        required: true
    }

}) 
const CommentModel = mongoose.model('comment', Comment)

module.exports =  CommentModel       