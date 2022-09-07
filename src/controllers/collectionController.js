const router = require('../core/routeConfig')
const collection = require('../service/collectionRoute')
const hasToken = require('../core/userAuth')


router.get('/', collection.getAllCollection )

router.get('/:Id', collection.getOneCollection)

router.post('/create',hasToken,collection.createCollection)

router.patch('/:Id',hasToken, collection.updateCollection) 

router.delete('/:Id',hasToken, collection.deleteCollection) 

module.exports = router 