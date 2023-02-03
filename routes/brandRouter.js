const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");

router.post("/", brandController.createBrand);
router.get("/", brandController.getBrands);

module.exports = router;