const router = require("../core/routeConfig");
const collection = require("../controllers/collectionController");
const authenticate = require("../core/userAuth");
router
  .route("/collection")
  .post(authenticate, collection.createCollection);

module.exports = router;
