const router = require('../core/routeConfig')
const collectionModel = require('../models/collection')
const BaseController = require('../utils/baseController')
const hasToken = require('../core/userAuth')

 

router.get('/:Id', async (req,res)=>{
 const collections = await collectionModel.find(req.params.Id).populate('createdBy')
 return BaseController.success(res, collections, "post created sucessfully", 200)
})

router.post('/create',hasToken, async (req,res)=>{
    const data = {
      name: req.body.name,
     Image : req.body.Image,
      likes: req.body.likes,
      createdBy: req.decoded,
    }
    try{
  const newCollection = new  collectionModel(data) 
  const created = await newCollection.save()
  if (!created) return BaseController.error(res, { message: 'something went wrong pls try again' })
 return BaseController.success(res, created, "post created sucessfully", 200)
}
catch(err){
    return BaseController.error(res, { message: err })
}
})
router.patch('/:id',hasToken, async (req,res)=>{
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
})       

module.exports = router