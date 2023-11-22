import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./authRouter.js";
import typeRouter "./typeRouter.js";
import brandRouter "./brandRouter.js";
import carRouter "./carRouter.js";
import requestRouter "./requestRouter.js";
import buyRequestRouter "./buyRequestRouter.js";

const router = new Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/car", carRouter);
router.use("/request", requestRouter);
router.use("/buyrequest", buyRequestRouter);

module.exports = router;
