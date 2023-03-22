const postRoute = require("../core/routeConfig");
const authenticate = require("../core/userAuth");
const post = require("../controllers/postController");

postRoute
    .route("/post")
    .post(authenticate, post.createPost);

postRoute.get("/post/all", authenticate, post.getAllPost);

postRoute.get("/post/one/:postId", authenticate, post.getPost);

postRoute.get("/post/user-post/:userId", authenticate, post.getUserPost);

postRoute.patch("/post/edit-post/:postId", authenticate, post.editPost);

postRoute.delete("/post/delete-post/:postId", authenticate, post.deletePost);

module.exports = postRoute;
