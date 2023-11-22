import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/create-type", AuthMiddleware, TypeController.createType);
router.get("/get-types", TypeController.getTypes);

export default router;
