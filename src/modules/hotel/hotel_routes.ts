import { Router } from "express";
import { createHotelController } from "./hotel_controller.js";
import { createHotelMiddleware } from "./hotel_middleware.js";
import { authmiddleware } from "../auth/auth_middleware.js";

const hotelRouter = Router();

hotelRouter.post("/create-Hotels", authmiddleware, createHotelMiddleware, createHotelController);

export default hotelRouter;