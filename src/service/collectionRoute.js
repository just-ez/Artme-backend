
const collectionModel = require('../models/collection')
const BaseController = require('../utils/baseController')


 
module.exports.getAllCollection = async (req,res)=> {
 const collections = await collectionModel.find({}).populate('createdBy')
 return BaseController.success(res, collections, "sucess", 200)
}

module.exports.getOneCollection = async (req,res)=>{
 const collections = await collectionModel.findById({_id: req.params.Id}).populate('createdBy')
 return BaseController.success(res, collections, "sucess", 200)
}

module.exports.createPost = async (req,res)=>{
    const data = {
      name: req.body.name,
     Image : req.body.Image,
      likes: req.body.likes,
      createdBy: req.decoded,
    }
    try{
  const newCollection = new  collectionModel(data) 
  const created = await newCollection.save()
  if (!created) return BaseController.error(res, 400, { message: 'something went wrong pls try again' })
 return BaseController.success(res, created, "post created sucessfully", 200)
}
catch(err){
    return BaseController.error(res,400, { message: err })
}
}

module.exports.updatePost = async (req,res)=>{ 
 try {
  const updated = req.body.name
  const id = req.params.id
 const findCollection = await collectionModel.findById(id).populate('createdBy')
   if (findCollection.createdBy._id == req.decoded._id) {
  const updateToDB = await collectionModel.updateOne({_id: id},updated)
  BaseController.success(res, updateToDB, "post created sucessfully", 200)
   }else {
    return BaseController.error(res, { message: 'you cannot take action' })
   }
   }
   catch(err) {
  return BaseController.error(res, { message: err })
   }
}

