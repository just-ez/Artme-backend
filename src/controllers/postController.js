const Post = require("../service/Post");
const { success, error } = require("../utils/baseController");

module.exports.createPost = async (req, res) => {
  try {
    const post = await new Post({
      createdBy: req.decoded,
      ...req.body,
    }).creatPost();
    return success(res,{post});
  } catch (err) {
    console.log(err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getPost = async (req, res) => {
    try {
      const post = await new Post({
      postId:  req.params.postId
      }).getPost();
      return success(res,{post});
    } catch (err) {
      console.log(err);
      return error(res, { code: err.code, message: err.message });
    }
  };
  
  module.exports.getAllPost = async (req, res) => {
    try {
        console.log("hi");
      const post = await new Post({
      }).getAllPost();
      return success(res,{post});
    } catch (err) {
      console.log(err);
      return error(res, { code: err.code, message: err });
    }
  };

  module.exports.getUserPost = async (req, res) => {
    try {
      const post = await new Post({
        userId: req.params.userId
      }).getAllPost();
      return success(res,{post});
    } catch (err) {
      console.log(err);
      return error(res, { code: err.code, message: err });
    }
  };
  