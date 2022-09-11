const router = require("../core/routeConfig");
const user = require("../controllers/Usercontroller");


router.get('/users', user.getAllUsers)

router.get('/users/:Id', user.getUserById) 

router.post('/signup', user.signup)

router.patch('/user', user.updateUser)

router.post('/login', user.login)

module.exports = router