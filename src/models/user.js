const mongoose = require("mongoose");
const { STATUS, USER_TYPE } = require("../utils/constants");
const bcrypt = require("bcrypt");
const Schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    trim: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  bio: {
    type: String,
    default: "",
  },
  profileImg: {
    type: String,
    default: "",
  },
  coverImg: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: Object.keys(STATUS),
    default: STATUS.ACTIVE,
  },
  user_type: {
    type: String,
    enum: Object.keys(USER_TYPE),
  },
});

Schema.pre("save", async function (next) {
  // if (!user.isModified('password')) return next();
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const USermodel = mongoose.model("user", Schema);

module.exports = USermodel;
