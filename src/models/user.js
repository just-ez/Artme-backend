const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
// const { STRING } = require('mysql/lib/protocol/constants/types');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
   email: {
       type: String,
       required: true,
   },
   password: {
       type: String,
       required: true,
       minlength: 6
   },
   profileImg: {
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
console.log({pass:this.password})  
 this.password = await bcrypt.hash(this.password, salt)
 next()

})
const USermodel = mongoose.model('user', Schema)

module.exports = USermodel