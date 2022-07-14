const router = require('../core/routeConfig')
const USermodel = require('../models/user.js')
const BaseController = require('../utils/baseController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_Secret_key, jwt_duration } = require('../core/config')



router.get('/users', async (req, res) => {
    const user = await USermodel.find({})
    if (user) res.status(200).send(user)
})

router.post('/signup', async (req, res) => {
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
            return BaseController.error(res, { message: "email already exists" })
        }
    } 

    catch (err) {
        BaseController.error(res, err, "error saving user")
    }

})

router.patch('/signup', async (req,res)=>{
    try {
        const updatedata = req.body
    const findUser = await USermodel.find({email: req.body.email})
    console.log(findUser)
    if (findUser) {
  const updated = await USermodel.updateOne({email: req.body.email}, updatedata)
  BaseController.success(res, updated, "user updated sucessfully", 200)
    }
}
catch (err){
    return BaseController.error(res, { message: "user not found" })
}
})

router.post('/login', async (req,res)=>{
    const user = await USermodel.findOne({email: req.body.email})
    console.log(user)
    if (user) {
      const checkPass = await bcrypt.compare(req.body.password, user.password)
      if (checkPass) {
  const   token =   jwt.sign({_id: user._id},jwt_Secret_key,{expiresIn: jwt_duration})
        BaseController.success(res, token, "login sucessfully" , 200)
      }
     else {
        return BaseController.error(res, { message: "invalid password" })
     }
    }
    return BaseController.error(res, { message: "user not found" })
})
module.exports = router 