const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {mongodburi,PORT} = require('./src/core/config')
const cors = require('cors')


const userController = require('./src/controllers/usercontroller')
const collectionController = require('./src/controllers/collectionController')
const paystack = require('./src/controllers/clientController')
const commentController = require('./src/controllers/commentController')

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors( ));
const hasToken = require('./src/core/userAuth')

//router middleware
app.use('/api/pay/',paystack)
app.use('/api/collection/',collectionController)
app.use('/api/',userController) 
app.use('/api/',commentController)
app.get('/',(req,res)=>{
    const apidoc = 'https://documenter.getpostman.com/view/21225799/UzQuR6VE'
    res.send(`for api documentation click the link: <a href="${apidoc}">doc</a>`)
})

// server connection
mongoose.connect(mongodburi)
.then(()=> app.listen(PORT,()=> console.log(`listening on port ${PORT}`)))
