const Collection = require("../service/collection");
const { success, error } = require("../utils/baseController");

module.exports.createCollection = async (req, res) => {
  try {
    const collection = await new Collection({
      createdBy: req.decoded,
      ...req.body,
    }).createCollection();
    if (collection) return success(res, { collection });
    error(res, { code: 400, message: "Incorrect Data Format" });
  } catch (err) {
    error(res, { code: err.code, message: err.message });
  }
};
