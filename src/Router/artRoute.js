const router = require("../core/routeConfig");
const art = require("../controllers/artController");
const hasToken = require("../core/userAuth");

router.get("/", art.getAllArt);

router.get("/:Id", art.getOneArt);

router.post("/create", hasToken, art.createArt);

router.post("/:id/add-art-image", hasToken, art.addArtImg);

router.patch("/:Id", hasToken, art.updateArt);

router.delete("/:Id", hasToken, art.deleteArt);

module.exports = router;
