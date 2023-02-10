const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");

router.get("/auth", UserController.checkUser);

module.exports = router;
