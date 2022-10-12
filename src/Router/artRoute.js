const router = require("../core/routeConfig");
const collection = require("../controllers/artController");
const hasToken = require("../core/userAuth");

router.get("/", collection.getAllArt);

router.get("/:Id", collection.getOneArt);

router.post("/create", hasToken, collection.createArt);

router.patch("/:Id", hasToken, collection.updateArt);

router.delete("/:Id", hasToken, collection.deleteArt);

module.exports = router;
