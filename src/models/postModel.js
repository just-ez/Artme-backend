const {Schema, model, default: mongoose} = require('mongoose')

const postSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array,
    },
    likes: {
        type: Array
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
})

const postModel = model('post', postSchema)

module.exports = postModel