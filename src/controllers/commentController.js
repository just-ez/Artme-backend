
const Comment = require('../service/comment')
const { success, error} = require('../utils/baseController')


module.exports.getComments = async (req,res) => {
    try {
        const comments = await new Comment(req.params.postId).getComment()
        console.log(comments);
    if (comments) return success(res,comments,200)
    else error(res,400,'no comment yet for this post')
    }
    catch (err) {
        return error(res,400,err)
    }
}

module.exports.createComment= async (req,res) => {

    try{
    const comment = await new Comment({
      decoded_Id: req.decoded._id,
      postId: req.params.postId,
      ...req.body,
    }).createComment();
    console.log(comment);
    if (comment) return success(res,comment,'comment created',200)
    else return error(res,400,'error creating comment')
}
 catch (err) {
    return error(res,400,err)
 }

}

module.exports.updateComment = async (req,res) => {
    try {
        const updated = await new Comment({commentId: req.params.commentId,decoded_Id: req.decoded._id, ...req.body}).updateComment()
    if (updated) return success(res,updated,'user updated',200)
    return error(res,400,'cannot perform action')
}
 catch(err) {
    return error(res,400,err)
 }
}

module.exports.deleteComment = async (req,res) => {
    try {
        const deleted = await new Comment(req.params.commentId).deleteComment()
        if (deleted) return success(res,deleted,'comment has been deleted',200)
        error(res,400,'you cannot perform this action')

    }
    catch(err) {
        return error(res,400,err)
    }
}