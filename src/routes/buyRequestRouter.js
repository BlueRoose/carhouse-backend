const Router = require("express");
const router = new Router();
const buyRequestController = require("../controllers/buyRequestController");

router.post("/", buyRequestController.createRequest);
router.get("/", buyRequestController.getRequests);

module.exports = router;
