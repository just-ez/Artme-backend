const Art = require("../service/Art");
const { success, error } = require("../utils/baseController");

module.exports.getAllArt = async (req, res) => {
  try {
    const Arts = await new Art().getAllArt();
    if (Arts) return success(res, Arts);
    return error(res, { code: 404, message: "No Art Found" });
  } catch (err) {
    return error(res, { code: err.code, message: err });
  }
};

module.exports.getOneArt = async (req, res) => {
  try {
    const art = await new Art(req.query.Id).getOneArt();
    if (art) return success(res, art, 200);
    return error(res, { code: 404, message: "Art Not Found" });
  } catch (err) {
     return error(res, { code: err.code, message: err });
  }
};

module.exports.createArt = async (req, res) => {
  try {
    const art = await new Art({
      decoded: req.decoded,
      ...req.body,
    }).createArt();
    if (art) return success(res, art, "Art created", 200);
    return error(res, { code: err.code, message: "couldnot create art" });
  } catch (err) {
    return error(res, { code: err.code, message: err });
  }
};

module.exports.likeArt = async (req, res) => {
  try {
    const {  reaction } = req.body;
    console.log(reaction);
    const userId = req.decoded;
    const docId = req.query.postId;
    const like = await new Art({
      reaction,
      docId,
      userId,
    }).likeArt();
    return success(res, {like})
  } catch (err) {
    console.log({err});
    error(res, { code: err.code, message: err.message });
  }
};

module.exports.addArtImg = async (req, res) => {
  try {
    const art = await new Art({
      id: req.params.id,
      image: req.body.image,
    }).addArtImg();
    if (art) return success(res, art, 200);
  } catch (err) {
    return error(res, { code: err.code, message: err });
  }
};

module.exports.updateArt = async (req, res) => {
  try {
    const updated = await new Art({
      Id: req.query.Id,
      decoded: req.decoded,
      ...req.body,
    }).updateArt();
    if (updated) return success(res, updated, 200);
    return error(res, { code: err.code, message: "You Do Not Have Access To This Request" });
  } catch (err) {
    return  error(res, { code: err.code, message: err });
  }
};

module.exports.deleteArt = async (req, res) => {
  try {
    const deleted = await new Art({
      Id: req.query.Id,
      decoded: req.decoded,
      ...req.body,
    }).deleteArt();
    if (deleted) return success(res, deleted, "Art deleted", 200);
    return error(res, { code: err.code, message: "couldn't delete art" });
  } catch (err) {
    return  error(res, { code: err.code, message: err });
  }
};
