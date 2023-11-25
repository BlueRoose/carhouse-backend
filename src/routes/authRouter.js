import { Router } from "express";
import apiLimiter from "../utils/apiLimiter.js";
import AuthController from "../controllers/authController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const authRouter = new Router();

authRouter.post("/pre-signup", apiLimiter, AuthController.preSignUp);
authRouter.post("/signup", apiLimiter, AuthController.signUp);
authRouter.post("/pre-signin", apiLimiter, AuthController.preSignIn);
authRouter.post("/signin", apiLimiter, AuthController.signIn);
authRouter.get("/user", AuthMiddleware, AuthController.getUser);

export default authRouter;
