const router = require("../core/routeConfig");
const art = require("../controllers/artController");
const hasToken = require("../core/userAuth");

router.get("/art/", art.getAllArt);


router.post("/art/create", hasToken, art.createArt);

router.post("/art/like-art", hasToken, art.likeArt);

router.get("/art/", art.getOneArt);

router.post("/art/:id/add-art-image", hasToken, art.addArtImg);

router.patch("/art/", hasToken, art.updateArt);

router.delete("/art/", hasToken, art.deleteArt);


module.exports = router;
