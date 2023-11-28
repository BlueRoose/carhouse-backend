import { Router } from "express";
import authRouter from "./authRouter.js";
import brandRouter from "./brandRouter.js";
import typeRouter from "./typeRouter.js";
import requestRouter from "./requestRouter.js";
import buyRequestRouter from "./buyRequestRouter.js";
import carRouter from "./carRouter.js";

const router = new Router();

router.use("/auth", authRouter);
router.use("/brand", brandRouter);
router.use("/type", typeRouter);
router.use("/request", requestRouter);
router.use("/buy-request", buyRequestRouter);
router.use("/car", carRouter);

export default router;
