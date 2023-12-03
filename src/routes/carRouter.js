import { Router } from "express";
import CarController from "../controllers/carController.js";
import RoleMiddleware from "../middlewares/roleMiddleware.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/create-car", RoleMiddleware, CarController.createCar);
router.delete("/delete-car", RoleMiddleware, CarController.deleteCar);
router.post("/add-to-favourites", AuthMiddleware, CarController.addToFavourites);
router.post("/remove-from-favourites", AuthMiddleware, CarController.removeFromFavourites);
router.get("/get-cars", CarController.getCars);
router.get("/get-car", CarController.getCar);
router.get("/get-favourites", AuthMiddleware, CarController.getUsersFavourites);

export default router;
