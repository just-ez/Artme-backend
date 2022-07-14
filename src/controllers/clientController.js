const router = require('../core/routeConfig')
const paystack = require('../integration/paystackClient')
const paydata = require('../models/paystack')

router.post('/', async (req,res)=>{
  const email = req.body.email
  const result = await paystack.initializePayment(email)
 res.send(result)
})
router.get('/', async (req,res)=>{
  
  const result = await paystack.verifyPayment('7a5dxcwwji')
 res.send(result)
})



module.exports = router