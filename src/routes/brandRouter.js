import { Router } from "express";
import BrandController from "../controllers/brandController.js";
import RoleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post("/create-brand", RoleMiddleware, BrandController.createBrand);
router.get("/get-brands", BrandController.getBrands);

export default router;
