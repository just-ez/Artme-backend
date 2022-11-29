const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {mongodburi,PORT} = require('./src/core/config')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRoute = require('./src/Router/userRoute')
const collectionRoute = require('./src/Router/artRoute')
const paystack = require('./src/controllers/clientController')
const commentRoute = require('./src/Router/commentRoute')
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors({
    origin: '*'
}));


//router middleware

app.use('/api/pay/',paystack)
app.use("/api/art/", collectionRoute);
app.use('/api/',userRoute) 
app.use('/api/',commentRoute)
app.get('/',(req,res)=>{
    const apidoc = 'https://documenter.getpostman.com/view/21225799/UzQuR6VE'
    res.send(`for api documentation click the link: <a href="${apidoc}">doc</a>`)
})

// server connection

mongoose.connect(mongodburi)
.then(()=> app.listen(PORT,()=>  console.log(`backend is listening ${PORT}`)))