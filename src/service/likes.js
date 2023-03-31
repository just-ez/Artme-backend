const likesModel = require("../models/likes");

class Likes {
  constructor(data) {
    this.data = data;
  }

 

  async unLikePost() {
    const { userId } = this.data;
    const deleteLike = await likesModel.deleteOne({createdBy: userId})
    return deleteLike
  }

 async getAllLikes() {
    const {post} = this.data
    console.log({post});
    return await  likesModel.find({post}).populate("docId createdBy")
  }
}


module.exports = Likes