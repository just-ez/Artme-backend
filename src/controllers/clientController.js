const router = require('../core/routeConfig')
const paystack = require('../integration/paystackClient')
// const paydata = require('../models/paystack')

router.post('/', async (req,res)=>{
  const email = req.body.email
  const result = await paystack.initializePayment(email)
 res.send(result)
})

router.get('/:ref', async (req,res)=>{
  const  ref = req.params.ref
  const result = await paystack.verifyPayment(ref)
 res.send(result)
})  



module.exports = router