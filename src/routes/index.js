import { Router } from "express";
import authRouter from "./authRouter.js";
import brandRouter from "./brandRouter.js";
import typeRouter from "./typeRouter.js";
import requestRouter from "./requestRouter.js";

const router = new Router();

router.use("/auth", authRouter);
router.use("/brand", brandRouter);
router.use("/type", typeRouter);
router.use("/request", requestRouter);

export default router;
