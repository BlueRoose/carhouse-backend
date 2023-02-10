const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const carRouter = require("./carRouter");
const requestRouter = require("./requestRouter");
const buyRequestRouter = require("./buyRequestRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/car", carRouter);
router.use("/request", requestRouter);
router.use("/buyrequest", buyRequestRouter);

module.exports = router;
