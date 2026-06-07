import { Router } from "express";
import { register, login, logout, getMe } from "./auth_controller.js";
import { authmiddleware } from "./auth_middleware.js";
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authmiddleware, getMe);
export default authRouter;
//# sourceMappingURL=auth_router.js.map