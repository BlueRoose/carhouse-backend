import { Router } from "express";
import RequestController from "../controllers/requestController.js";
import RoleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post("/create-request", RoleMiddleware, RequestController.createRequest);
router.get("/get-requests", RoleMiddleware, RequestController.getRequests);

export default router;
