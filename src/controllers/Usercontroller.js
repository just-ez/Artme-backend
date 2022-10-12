const router = require('../core/routeConfig')
const User = require('../service/user')
const {success, error} = require('../utils/baseController')

module.exports.getAllUsers =  async(req,res) => {
  try {
  const users = await new User().getAll()
  if (users) return success(res, users,200)
  else return error(res,404,'user not found')
  }
  catch(err) {
    return error(res,err.code,err.message)
  }
}

module.exports.getUserById =  async (req,res) => {
  try {
    const user = await new User(req.params.Id).getUserById()
    if (user) return success(res, user, 200)
    else return error(res, 404, 'user not found')
  } catch (err) {
    error(res,err.code,err.message)
  }
}

module.exports.signup = async (req,res) => {
  try {
    const user = await new User(req.body).signup()
    if (user) return success(res, user, 'user created successfully',200)
    else return error(res,err.code,'user with email already exists')
  }
  catch (err) {
 return error(res,err.code,err.message)
  }
}

module.exports.updateUser = async (req,res) => {
  try {
  const updateUser = await new User({email: req.body.email, ...req.body}).updateUserBoi()
  if (updateUser)  return success(res, updateUser, 'user details updated',200)
   return error(res,err.code,'unable to update user')
  }
  catch(err) {
  return error(res,err.code,err.message)
  }
}

module.exports.updateProfileImg = async (req,res) => {
 try {
  await new User({email: req.body.email, ...req.body}).updateProfileImg()
   return success(res, [], 'user profile image updated',200)
 } catch (err) {
  console.log('err occured');
  return error(res,err.code,err.message)
 }
}


module.exports.updateCoverImg = async (req,res) => {
  try {
   await new User({email: req.body.email, ...req.body}).updateCoverImg()
   return success(res, [], 'user cover image updated')
  } catch (err) {
   return error(res,err.code,err.message)
  }
 }
 

module.exports.login = async(req, res) => {
  try {
    const token = await new User(req.body).login()
    if (token) return success(res, token, 'login succsessful')
    return error(res,err.code,'incorrect user details')
  }
  catch(err) {
    return error(res,err.code,err)
  }
}

// module.exports = router