const { json } = require('body-parser')
const { response } = require('express')
const router = require('../core/routeConfig')
const {initializePayment,verifyPayment,createTransferRecipient} = require('../integration/paystackClient')

router.post('/pay', (req,res)=>{
    const email = req.body.email
    req.body.metadata = {
        full_name: req.body.full_name
    }
    initializePayment(email)
    response = JSON.parse(body)
    return response.data.authorization_url
})

router.get('/paystack/callback',(req,res)=>{
    const reference = req.query.reference
    verifyPayment(reference)
})