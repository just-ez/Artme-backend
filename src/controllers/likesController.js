const Likes = require("../service/likes");
const { success, error } = require("../utils/baseController");

module.exports.likePost = async (req, res) => {
  try {
    const {  reaction } = req.body;
    const userId = req.decoded;
    const post = req.query.postId;
    const like = await new Likes({
      reaction,
      post,
      userId,
    }).likePost();
    return success(res, {like})
  } catch (err) {
    error(res, { code: err.code, message: err.message });
  }
};

module.exports.getAllLikes = async (req, res) => {
    try {
      const post = req.query.postId;
      const like = await new Likes({
        post,
      }).getAllLikes();
      return success(res, {like})
    } catch (err) {
      error(res, { code: err.code, message: err.message });
    }
  };

  module.exports.deleteLike = async (req, res) => {
    try {
      const userId = req.decoded;
      const like = await new Likes({
        userId
      }).unLikePost();
      return success(res, {like})
    } catch (err) {
      error(res, { code: err.code, message: err.message });
    }
  };