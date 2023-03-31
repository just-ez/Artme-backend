const likes = require("../controllers/likesController");
const router = require("../core/routeConfig");
const authentication = require("../core/userAuth");
router
  .route("/like")
  .post(authentication, likes.likePost)

  router
  .route("/like/all")
  .get(authentication, likes.getAllLikes);

  router
  .route("/like/unlike")
  .get(authentication, likes.deleteLike);

module.exports = router;
