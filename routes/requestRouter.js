const Router = require("express");
const router = new Router();
const requestController = require("../controllers/requestController");

router.post("/", requestController.createRequest);
router.get("/", requestController.getRequests);

module.exports = router;