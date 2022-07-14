
const jwt = require('jsonwebtoken')
const {jwt_Secret_key} = require('../core/config')
const Usermodel = require('../models/user')


module.exports = async (req,res,next)=>{
    const token =  req.headers.authorization 
    try {
        if (token) {
            const noBearer = token.replace(/Bearer\s/gi, '')
       const decoded =  jwt.verify(noBearer,jwt_Secret_key)
       const user = await  Usermodel.findById({_id: decoded._id})
       if (!user) return res.status(404).send({sucess: false,message:"user with token not found"})
           req.decoded = decoded
       return next()
        }
     return   res.status(403).send({sucess: false,message:"you have to be logged in"})
    }
    catch(err){
        res.status(400).send({sucess: false,message: err}) 
    }
}