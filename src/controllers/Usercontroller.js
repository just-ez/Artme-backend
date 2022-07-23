const router = require('../core/routeConfig')
const user = require('../service/user')

router.get('/users',user.getAll)

router.post('/signup',user.signup)

router.patch('/updateUser',user.updateUser)

router.post('/login', user.login)

module.exports = router