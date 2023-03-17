const Art = require("../service/Art");
const { success, error } = require("../utils/baseController");

module.exports.getAllArt = async (req, res) => {
  try {
    const Arts = await new Art().getAllArt();
    if (Arts) return success(res, Arts);
    return error(res, 400, "unable to get users");
  } catch (err) {
    error(res, 400, err);
  }
};

module.exports.getOneArt = async (req, res) => {
  try {
    const art = await new Art(req.params.Id).getOneArt();
    if (art) return success(res, art, 200);
    return error(res, 404, "Art not found");
  } catch (err) {
    return error(res, 400, err);
  }
};

module.exports.createArt = async (req, res) => {
  try {
    const art = await new Art({
      decoded: req.decoded,
      ...req.body,
    }).createArt();
    if (art) return success(res, art, "Art created", 200);
    return error(res, 404, "cannot find any data");
  } catch (err) {
    return error(res, 400, err.message);
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
    return error(res, 400, err.message);
  }
};

module.exports.updateArt = async (req, res) => {
  try {
    const updated = await new Art({
      Id: req.params.Id,
      decoded: req.decoded,
      ...req.body,
    }).updateArt();
    if (updated) return success(res, updated, 200);
    return error(res, 400, "can not perform action");
  } catch (err) {
    return error(res, 400, err.message);
  }
};

module.exports.deleteArt = async (req, res) => {
  try {
    const deleted = await new Art({
      Id: req.params.Id,
      decoded: req.decoded,
      ...req.body,
    }).deleteArt();
    if (deleted) return success(res, deleted, "Art deleted", 200);
    return error(res, 400, "cannot delete Art");
  } catch (err) {
    return error(res, 400, err);
  }
};
