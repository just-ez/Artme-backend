const router = require("../core/routeConfig");
const user = require("../controllers/Usercontroller");


router.get('/users', user.getAllUsers)

router.get('/users/:Id', user.getUserById) 

router.post('/signup', user.signup)

router.patch('/user/bio', user.updateUser)

router.post('/user/profileImg', user.updateProfileImg)

router.post('/user/coverImg', user.updateCoverImg)

router.post('/login', user.login)

module.exports = router