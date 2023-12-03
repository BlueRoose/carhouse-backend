import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import RoleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post("/create-type", RoleMiddleware, TypeController.createType);
router.patch("/update-type", RoleMiddleware, TypeController.updateType);
router.delete("/delete-type", RoleMiddleware, TypeController.deleteType);
router.get("/get-types", TypeController.getTypes);

export default router;
