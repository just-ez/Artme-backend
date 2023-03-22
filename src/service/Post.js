const postModel = require("../models/postModel");

class Post {
  constructor(data) {
    this.data = data;
  }

  async creatPost() {
    const { description, createdBy, image } = this.data;
    return await new postModel({ description, createdBy, image }).save();
  }

  async getPost() {
    const { postId } = this.data;
    return await postModel.findOne({ _id: postId }).populate("createdBy");
  }

  async getAllPost() {
    return await postModel.find({}).populate("createdBy");
  }

  async getUserPost() {
    const { userId } = this.data;
    return await postModel.find({ createdBy: userId }).populate("createdby");
  }

 async editPost() {
    
  }


}

module.exports = Post;
