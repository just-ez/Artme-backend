
const ArtModel = require('../models/art')
const BaseController = require('../utils/baseController')
const cloudinary = require('../core/cloudinaryConfig.js');


 
class Art {
  constructor(data) {
    this.data = data;
  }

  async getAllArt() {
    const Arts = await ArtModel.find({}).populate("createdBy");
    return Arts;
  }
  async getOneArt() {
    console.log(this.data);
    const Arts = await ArtModel
      .findById({ _id: this.data })
      .populate("createdBy");
    return Arts;
  }

  async createArt() {
    const data = {
      name: this.data.name,
      description: this.data.description,
      likes: this.data.likes,
      createdBy: this.data.decoded._id,
    };
    const newArt = new ArtModel(data);
    const created = await newArt.save();
    if (created) {
      created.image = [...this.data.image]
      created.save()
      return created
    };
  }
  async addArtImg() {
    const data = {
      id: this.data.id,
      image: this.data.image,
    };
    const ART = await ArtModel.findById(data.id)
    ART.image.push(data.image)
    const saved = ART.save()
    return saved
    
  }


  async updateArt() {
    const updated = this.data;
    const id = this.data.Id;
    const findArt = await ArtModel
      .findById(id)
      .populate("createdBy");
    if (findArt.createdBy._id == this.data.decoded._id) {
      const updateToDB = await ArtModel.updateOne({ _id: id }, updated);
      return updateToDB;
    }
  }

  async deleteArt() {
    const id = this.data.Id;
    const findArt = await ArtModel
      .findById(id)
      .populate("createdBy");
    if (findArt.createdBy._id == this.data.decoded._id) {
      const delete_from_db = await ArtModel.deleteOne({ _id: id });
      return delete_from_db;
    }
  }
}



module.exports = Art