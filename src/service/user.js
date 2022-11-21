
const USermodel = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_Secret_key, jwt_duration } = require('../core/config');
const cloudinary = require('../core/cloudinaryConfig.js');
const { api_key, api_secret, cloud_name } = require('../core/config')


 class User {
   constructor(data) {
     this.data = data;
     this.errors = [];
   }
   async getAll() {
     const user = await USermodel.find({});
     if (user) return user;
   }

   async getUserById() {
     const id = this.data;
     const user = await USermodel.find({ _id: id });
     if (user) return user;
   }

   async signup() {
     const alreadyExists = await USermodel.findOne({ email: this.data.email });
     if (!alreadyExists) {
       const createUser = new USermodel(this.data);
       const user = await createUser.save();
       if (user) return user;
       return { msg: "unable to create user" };
     }
   }

   async updateUserBoi() {
     const updatedata = this.data.bio;
     const findUser = await USermodel.findOne({ email: this.data.email });
     console.log(updatedata);
     if (findUser) {
       const updated = await USermodel.updateOne(
         { email: findUser.email },
         {bio: updatedata}
       );
       return updated;
     }
   }

   async updateProfileImg() {
  
    const data = {
      profileImg: this.data.profileImg
    }
   const user = await USermodel.findOne({
     email: this.data.email 
    });
   if (user) {
   const updateImg = await cloudinary.v2.uploader.upload(this.data.profileImg, {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  })
      const updated = await USermodel.updateOne(
        { email: user.email },
        {profileImg: updateImg.url})
      console.log(updated);
      return updated
   }

   }

   async updateCoverImg() {
    const data = {
      coverImg: this.data.coverImg
    }
   const user = await USermodel.findOne({ 
    email: this.data.email
   });
   if (user) {
    const imgurl = await cloudinary.v2.uploader.upload(data.coverImg,{
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    })
    const updated = await USermodel.updateOne(
      { email: user.email },
      {coverImg: imgurl.url}
    );
    return updated
   }

   }


   async login() {
     const user = await USermodel.findOne({ email: this.data.email });
     if (user) {
       const checkPass = await bcrypt.compare(
         this.data.password,
         user.password
       );
       if (checkPass) {
         const token = jwt.sign({ _id: user._id }, jwt_Secret_key, {
           expiresIn: jwt_duration,
         });
         return token;
       }
     }
   }


 }


module.exports = User