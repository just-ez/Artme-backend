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
    return error(res,400,err)
  }
}

module.exports.getUserById =  async (req,res) => {
  try {
    const user = await new User(req.params.Id).getUserById()
    if (user) return success(res, user, 200)
    else return error(res, 404, 'user not found')
  } catch (err) {
    error(res,400,err)
  }
}

module.exports.signup = async (req,res) => {
  try {
    const user = await new User(req.body).signup()
    if (user) return success(res, user, 'user created successfully')
    else return error(res,400,'user with email already exists')
  }
  catch (err) {
 return error(res,400,err)
  }
}

module.exports.updateUser = async (req,res) => {
  try {
  const updateUser = await new User(req.body).updateUser()
  if (updateUser)  return success(res, updateUser, 'user details updated')
   return error(res,400,'unable to update user')
  }
  catch(err) {
  return error(res,400,err.message)
  }
}

module.exports.login = async(req, res) => {
  try {
    const token = await new User(req.body).login()
    if (token) return success(res, token, 'login succsessful')
    return error(res,400,'incorrect user details')
  }
  catch(err) {
    return error(res,400,err)
  }
}

// module.exports = router