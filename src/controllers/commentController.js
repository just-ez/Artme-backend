
const Comment = require('../service/comment')
const { success, error} = require('../utils/baseController')


module.exports.getComments = async (req,res) => {
    try {
        const comments = await new Comment(req.params.postId).getComment()
        console.log(comments);
    if (comments) return success(res,comments,200)
    else return error(res, { code: 404, message: "No Comment On This Post" });
    }
    catch (err) {
        return error(res, { code: err.code, message: err });
    }
}



module.exports.updateComment = async (req,res) => {
    try {
        const updated = await new Comment({commentId: req.params.commentId,decoded_Id: req.decoded._id, ...req.body}).updateComment()
    if (updated) return success(res,updated,'user updated',200)
    return error(res, { code: 401, message: "You Can not Perform This Action" });
}
 catch(err) {
    return error(res, { code: err.code, message: err });
 }
}

module.exports.deleteComment = async (req,res) => {
    try {
        const deleted = await new Comment(req.params.commentId).deleteComment()
        if (deleted) return success(res,deleted,'comment has been deleted',200)
        return error(res, { code: 401, message: "You Can not Perform This Action" });

    }
    catch(err) {
        return error(res, { code: err.code, message: err });
    }
}