import { Router } from "express";
import BrandController from "../controllers/brandController.js";
import RoleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post("/create-brand", RoleMiddleware, BrandController.createBrand);
router.patch("/update-brand", RoleMiddleware, BrandController.updateBrand);
router.delete("/delete-brand", RoleMiddleware, BrandController.deleteBrand);
router.get("/get-brands", BrandController.getBrands);

export default router;
