import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import RoleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post("/create-type", RoleMiddleware, TypeController.createType);
router.get("/get-types", TypeController.getTypes);

export default router;
