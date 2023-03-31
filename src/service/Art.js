const artModel = require("../models/art");
const likesModel = require("../models/likes");

class Art {
  constructor(data) {
    this.data = data;
  }

  async getAllArt() {
    const Arts = await artModel.find({}).populate("createdBy");
    return Arts;
  }
  async getOneArt() {
    const Arts = await artModel.findById({ _id: this.data }).populate(
      "createdBy"
    );
    return Arts;
  }

  async createArt() {
    const data = {
      name: this.data.name,
      description: this.data.description,
      likes: this.data.likes,
      createdBy: this.data.decoded._id,
      image: this.data.image
    };
    const newArt = new artModel(data);
    const created = await newArt.save();
    if (created)
      return created;
    
  }
  async addArtImg() {
    const data = {
      id: this.data.id,
      image: this.data.image,
    };
    const ART = await artModel.findById(data.id);
    ART.image.push(data.image);
    const saved = ART.save();
    return saved;
  }

  async likeArt() {
    const { reaction, docId, userId } = this.data;
    return await new likesModel({
      reaction,
      docId,
      docModel: 'art',
      createdBy: userId,
    }).save();
  }

  async updateArt() {
    const updated = this.data;
    const id = this.data.Id;
    const findArt = await artModel.findById(id).populate("createdBy");
    if (findArt.createdBy._id == this.data.decoded._id) {
      const updateToDB = await artModel.updateOne({ _id: id }, updated);
      return updateToDB;
    }
  }

  async deleteArt() {
    const id = this.data.Id;
    const findArt = await artModel.findById(id).populate("createdBy");
    if (findArt.createdBy._id == this.data.decoded._id) {
      const delete_from_db = await artModel.deleteOne({ _id: id });
      return delete_from_db;
    }
  }
}

module.exports = Art;
