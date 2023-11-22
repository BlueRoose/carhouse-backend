import { Router } from "express";
import BrandController from "../controllers/brandController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/create-brand", AuthMiddleware, BrandController.createBrand);
router.get("/get-brands", BrandController.getBrands);

export default router;
