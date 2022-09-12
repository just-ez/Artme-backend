
const collectionModel = require('../models/collection')
const BaseController = require('../utils/baseController')


 
class Collection {
  constructor(data) {
    this.data = data;
  }

  async getAllCollection() {
    const collections = await collectionModel.find({}).populate("createdBy");
    return collections;
  }
  async getOneCollection() {
    console.log(this.data);
    const collections = await collectionModel
      .findById({ _id: this.data })
      .populate("createdBy");
    return collections;
  }

  async createCollection() {
    const data = {
      name: this.data.name,
      Image: this.data.Image,
      likes: this.data.likes,
      createdBy: this.data.decoded._id,
    };

    const newCollection = new collectionModel(data);
    const created = await newCollection.save();
    if (created) return created;
  }

  async updateCollection() {
    console.log(this.data.decoded._id);
    const updated = this.data.name;
    const id = this.data.Id;
    const findCollection = await collectionModel
      .findById(id)
      .populate("createdBy");
    console.log(this.data.decoded);
    if (findCollection.createdBy._id == this.data.decoded._id) {
      const updateToDB = await collectionModel.updateOne({ _id: id }, updated);
      return updateToDB;
    }
  }

  async deleteCollection() {
    const id = this.data.Id;
    const findCollection = await collectionModel
      .findById(id)
      .populate("createdBy");
    if (findCollection.createdBy._id == this.data.decoded._id) {
      const delete_from_db = await collectionModel.deleteOne({ _id: id });
      return delete_from_db;
    }
  }
}






 

module.exports = Collection