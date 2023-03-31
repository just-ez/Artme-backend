const { Schema, model, default: mongoose } = require("mongoose");

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const collectionModel = model("collection", collectionSchema);

module.exports = collectionModel
