import { Router } from "express";
import BuyRequestController from "../controllers/buyRequestController.js";
import RoleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post(
  "/create-buy-request",
  RoleMiddleware,
  BuyRequestController.createBuyRequest
);
router.get(
  "/get-buy-requests",
  RoleMiddleware,
  BuyRequestController.getBuyRequests
);

export default router;
