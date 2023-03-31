const postRoute = require("../core/routeConfig");
const authenticate = require("../core/userAuth");
const post = require("../controllers/postController");

postRoute
    .post("/post",authenticate, post.createPost);

postRoute.get("/post/all", authenticate, post.getAllPost);

postRoute.post("/post/like-post", authenticate, post.likePost);

postRoute.post("/comment/", authenticate, post.createComment);

postRoute.get("/post/one/:postId", authenticate, post.getPost);

postRoute.get("/post/user-post/:userId", authenticate, post.getUserPost);

postRoute.patch("/post/edit-post/:postId", authenticate, post.editPost);

postRoute.delete("/post/delete-post/:postId", authenticate, post.deletePost);

module.exports = postRoute;
