import { Router } from "express";
import { createBookingController, getBookingsController } from "./booking_controller.js";
import { authmiddleware } from "../auth/auth_middleware.js";
import { requireRole } from "../../middleware/role_middleware.js";

const bookingrouter = Router();

bookingrouter.post("/bookings",
    authmiddleware,
    requireRole('customer'),
    createBookingController
);

bookingrouter.get("/bookings",
    authmiddleware,
    requireRole('customer'),
    getBookingsController
);
export default bookingrouter;