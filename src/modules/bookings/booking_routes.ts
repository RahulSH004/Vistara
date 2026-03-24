import { Router } from "express";
import { createBookingController } from "./booking_controller.js";
import { authmiddleware } from "../auth/auth_middleware.js";
import { requireRole } from "../../middleware/role_middleware.js";

const bookingrouter = Router();

bookingrouter.post("/bookings",
    authmiddleware,
    requireRole('customer'),
    createBookingController
);

export default bookingrouter;