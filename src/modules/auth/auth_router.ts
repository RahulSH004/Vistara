import { Router } from "express";
import { register, login, logout } from "./auth_controller.js";

const authRouter = Router();

authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/login", login);
authRouter.post("/api/auth/logout", logout);

export default authRouter;