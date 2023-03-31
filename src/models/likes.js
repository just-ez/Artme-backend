const { Schema, model, default: mongoose } = require("mongoose");
const {REACTIONS} = require("../utils/constants")
const likesSchema = new Schema({
  reaction: {
    type: String,
    enum: Object.keys(REACTIONS),
    required: true,
  },
  docId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'docModel'
  },
  docModel: {
    type: String,
    required: true,
    enum: ['art', 'post', 'collection']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const likesModel = model("likes", likesSchema);

module.exports = likesModel
