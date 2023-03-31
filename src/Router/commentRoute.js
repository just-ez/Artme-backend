const router = require("../core/routeConfig");
const comment = require("../controllers/commentController");
// check token
const hasToken = require("../core/userAuth");

router.get("/:postId/comments", hasToken, comment.getComments);

router.patch("/:postId/comments/:commentId", hasToken, comment.updateComment);

router.delete("/:postId/comments/:commentId", hasToken, comment.deleteComment);

module.exports = router;
