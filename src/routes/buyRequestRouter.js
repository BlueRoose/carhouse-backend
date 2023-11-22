import { Router } from "express";
import BuyRequestController from "../controllers/buyRequestController";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/create-buy-request", AuthMiddleware, BuyRequestController.createBuyRequest);
router.get("/get-buy-requests", AuthMiddleware, BuyRequestController.getBuyRequests);

export default router;
