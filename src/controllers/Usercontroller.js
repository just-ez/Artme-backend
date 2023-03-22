const router = require("../core/routeConfig");
const User = require("../service/user");
const { success, error } = require("../utils/baseController");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await new User().getAll();
    if (users) return success(res, users, 200);
   
  } catch (err) {
      return error(res, { code: err.code, message: err });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    console.log(req.decoded);
    const user = await new User(req.decoded._id).getUserById();
    if (user) return success(res, user, 200);
    return error(res, { code: err.code, message: "User With Id Not Found" });
  } catch (err) {
    return error(res, { code: err.code, message: err });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const user = await new User(req.body).signup();
    if (user) return success(res, user, "user created successfully", 200);
    return error(res, { code: 400, message: "Email Already Exists" });
  } catch (err) {
      return error(res, { code: err.code, message: err });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const updateUser = await new User({
      email: req.body.email,
      ...req.body,
    }).updateUserBoi();
    if (updateUser)
      return success(res, updateUser, "user details updated", 200);
      return error(res, { code: 401, message: "cannot update user profile" });
  } catch (err) {
      return error(res, { code: err.code, message: err });
  }
};

module.exports.updateProfileImg = async (req, res) => {
  try {
    console.log('profile',req.decoded);
    const userProfile = await new User({
      id: req.decoded._id,
      profileImage: req.body.profileImage,
    }).updateProfileImg();
    console.log(userProfile);
    if (userProfile)
      return success(res, userProfile, "user profile image updated", 200);
      return error(res, { code: 401, message: "cannot update user profile" });
  } catch (err) {
    console.log(err);
    return error(res, { code: err.code, message: err });
  }
};

module.exports.updateCoverImg = async (req, res) => {
  try {
    console.log(req.decoded);
    const img = await new User({
      id: req.decoded._id,
      coverImage: req.body.coverImage,
    }).updateCoverImg();
    if (img) return success(res, img, "user cover image updated");
    return error(res, { code: 401, message: "Incorrect Data Type" });
  } catch (err) {
    console.log(err);
    return error(res, { code: err.code, message: err });
  }
};

module.exports.login = async (req, res) => {
  try {
    const token = await new User(req.body).login();
    if (token) return success(res, token, "login succsessful");
    return error(res, { code: err.code, message: "Incorrest credentails" });
  } catch (err) {
    return error(res, { code: err.code, message: err });
  }
};


