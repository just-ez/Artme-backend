
const baseController = require('../utils/baseController')
 
 const comment = require('../models/comment')
 

// creating comments

class Comment {
  constructor(data) {
    this.data = data;
  }

  async getComment() {
    const comments = await comment
      .find({
        commentName: this.data.postId,
      })
      .populate("createdBy");
    // console.log(comments);
    return comments;
  }

  async createComment() {
    const comments = new comment({
      post: this.data.postId,
      text: this.data.text,
      likes: this.data.likes,
      createdBy: this.data.decoded_Id,
    });
    const result = await comments.save();
    // console.log(comment);
    if (result) return result;
  }

  async updateComment() {
    const commentId = this.data.commentId;
    const data = this.data;
    const findCollection = await comment.findById({ _id: commentId });
    const collStr=findCollection.createdBy._id.toString()
    if (collStr === this.data.decoded_Id) {
      const updated = await comment.findByIdAndUpdate({ _id: commentId }, data);
      console.log(updated);
      if (updated) return updated;
    }
  }

    async deleteComment()  {
  
      const commentId = this.data.commentId
   const updated = await comment.deleteOne({_id: commentId})
   if (updated) return updated
  
  }
}



 



module.exports = Comment