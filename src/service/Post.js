const postModel = require("../models/postModel");
const USermodel = require("../models/user");
const likesModel = require("../models/likes");
const commentModel = require("../models/comment");


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

  async likePost() {
    const { reaction, docId, userId } = this.data;
    return await new likesModel({
      reaction,
      docId,
      docModel: 'post',
      createdBy: userId,
    }).save();
  }

  async editPost() {
    const { description, userId, postId } = this.data;
    const findUser = await USermodel.findOne({ _id: userId });
    console.log(description);
    const post = await postModel.findOne({ _id: postId }).populate("createdBy");
    if (findUser._id.toString() === post.createdBy._id.toString())
      return await postModel.updateOne({ _id: postId }, { description });
  }

  async deletePost() {
    const { userId, postId } = this.data;
    const findUser = await USermodel.findOne({ _id: userId });
    const post = await postModel.findOne({ _id: postId }).populate("createdBy");
    if (findUser._id.toString() === post.createdBy._id.toString())
      return await postModel.deleteOne({ _id: postId });
  }

  async createComment() {
    const comments = new commentModel({
      docId: this.data.docId,
      text: this.data.text,
      docModel: this.data.docModel,
      createdBy: this.data.decoded_Id,
    });
    const result = await comments.save();
    if (result) return result;
  }


}

module.exports = Post;
