const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true  
    },
   email: {
       type: String,
       required: true,
   },
   phone_number: {
    type: Number,
    trim: true
   },
   password: {
       type: String,
       required: true,
       minlength: 6
   },
   bio: {
    type: String,
    default: 'no boi'
   },
   profileImg: {
    type: String
   },
   coverImg: {
     type: String
   },
   isVerified: {
       type: Boolean,
       default: false
   }
})

Schema.pre('save', async function (next) {
    // if (!user.isModified('password')) return next();
 let salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
 next()

})
const USermodel = mongoose.model('user', Schema)

module.exports = USermodel