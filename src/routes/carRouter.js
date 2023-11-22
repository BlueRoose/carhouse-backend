import { Router } from "express";
import CarController from "../controllers/carController";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/create-car", AuthMiddleware, CarController.createCar);
router.get("/get-cars", CarController.getCars);
router.get("/get-car", CarController.getCar);

export default router;
