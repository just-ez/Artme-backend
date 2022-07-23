
const baseController = require('../utils/baseController')
 
 const comment = require('../models/comment')
 
const mongoose = require('mongoose')
// creating comments

module.exports.getComment = async (req,res)=>{
    console.log(req.params.postId);
    const comments = await comment.find({
        post:mongoose.Types.ObjectId(req.params.postId)
    }).populate('collectionName createdBy')
  res.send(comments) 
}

module.exports.createComment = async (req,res)=>{
  try {
    const comments = new comment({
        post: req.params.postId, 
        text: req.body.text,
        likes: req.body.likes,
        createdBy: req.decoded
    })
  const comment = await comments.save()
   if (comment)  return baseController.success(res,updated,'comment updated')
   return baseController.error(res,400,'unable to upload comment')
  }
  catch(err) {
    return baseController.error(res,501,err)
  }
}

module.exports.updateComment = async (req,res) => {
    try{
    const commentId = req.params.commentId
    const data = req.body
 const updated = await comment.updateOne({_id: commentId}, data)
 if (updated) return baseController.success(res,updated,'comment updated')
 }
 catch(err) {
    return baseController.error(res,501,err)
 }
}
module.exports.deleteComment = async (req,res) => {
    try{
    const commentId = req.params.commentId
 const updated = await comment.deleteOne({_id: commentId})
 if (updated) return baseController.success(res,updated,'comment deleted')
 }
 catch(err) {
    return baseController.error(res,501,err)
 }
}
