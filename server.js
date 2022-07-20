const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {mongodburi,PORT} = require('./src/core/config')
const cors = require('cors')


const userRouter = require('./src/service/user')
const collectionRouter = require('./src/routes/collectionRoute')
const paystack = require('./src/controllers/clientController')
const commentRoute = require('./src/routes/commentsRoutes')

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors({ 
     origin: "*", 
   methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

//router middleware
app.use('/api/pay/',paystack)
app.use('/api/collection/',collectionRouter)
app.use('/api/',userRouter)
app.use('/api/',commentRoute)
app.get('/',(req,res)=>{
    const apidoc = 'https://documenter.getpostman.com/view/21225799/UzQuR6VE'
    res.send(`for api documentation click the link: <a href="${apidoc}">doc</a>`)
})

// server connection
mongoose.connect(mongodburi)
.then(()=> app.listen(PORT,()=> console.log(`listening on port ${PORT}`)))
