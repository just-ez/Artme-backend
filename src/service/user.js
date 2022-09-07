
const USermodel = require('../models/user.js')
const BaseController = require('../utils/baseController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_Secret_key, jwt_duration } = require('../core/config')



module.exports.getAll = async (req, res) => {
    const user = await USermodel.find({})
    if (user) res.status(200).send(user)
}

module.exports.getUserById = async (req, res) => {
    const id = req.params.Id 
    const user = await USermodel.find({_id: id})
    if (user) res.status(200).send(user)
}


module.exports.signup =  async (req, res) => {
    try {
        const alreadyExists = await USermodel.findOne({ email: req.body.email })
        // console.log(req.body)
        if (!alreadyExists) {
            const user = new USermodel(req.body)
            // console.log(user)
            const result = await user.save()
            console.log(result
                )
            BaseController.success(res, result, "user created sucessfully", 200)
        } 
        else {  
            return BaseController.error(res,400, { message: "email already exists" })
        }
    } 

    catch (err) {
        BaseController.error(res, err, "error saving user")
    }

}

module.exports.updateUser =  async (req,res)=>{
    try {
        const updatedata = req.body
    const findUser = await USermodel.find({email: req.body.email})
    
    if (findUser) {
  const updated = await USermodel.updateOne({email: req.body.email}, updatedata)
  BaseController.success(res, updated, "user updated sucessfully", 200)
    }
}
catch (err){
    return BaseController.error(res, { message: "user not found" })
}
}

module.exports.login =   async (req,res)=>{
    const user = await USermodel.findOne({email: req.body.email})
    if (user) {
      const checkPass = await bcrypt.compare(req.body.password, user.password)
      if (checkPass) {
  const   token =   jwt.sign({_id: user._id},jwt_Secret_key,{expiresIn: jwt_duration})
     return   BaseController.success(res, token, "login sucessfully" , 200)
      }
     else {
        return BaseController.error(res, 400,  "invalid password" )
     }
    }
   else 
   {
     return BaseController.error(res,404, "user not found" )
   }
}
