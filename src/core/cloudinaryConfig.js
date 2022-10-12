const { api_key, api_secret, cloud_name } = require('./config')

const cloudinary = require('cloudinary')

cloudinary.v2.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})

module.exports = cloudinary