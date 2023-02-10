const Router = require("express");
const router = new Router();
const carController = require("../controllers/carController");

router.post("/", carController.createCar);
router.get("/", carController.getCars);
router.get("/:id", carController.getOneCar);

module.exports = router;
