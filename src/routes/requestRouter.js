import { Router } from "express";
import RequestController from "../controllers/requestController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/create-request", AuthMiddleware, RequestController.createRequest);
router.get("/get-requests", AuthMiddleware, RequestController.getRequests);

export default router;
