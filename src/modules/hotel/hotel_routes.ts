import { Router } from "express";
import { createHotelController } from "./hotel_controller.js";

import { authmiddleware } from "../auth/auth_middleware.js";
import { requireRole } from "../../middleware/role_middleware.js";

const hotelRouter = Router();

hotelRouter.post("/create-Hotels", authmiddleware, requireRole("admin"), createHotelController);

export default hotelRouter;