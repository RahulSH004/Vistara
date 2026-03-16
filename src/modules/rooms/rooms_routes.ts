import { Router } from "express";
import { createRoomcontroller } from "./rooms_controller.js";
import { authmiddleware } from "../auth/auth_middleware.js";
import { requireRole } from "../../middleware/role_middleware.js";
import { requireHotelowner } from "./rooms_middleware.js";

const roomrouter = Router()

roomrouter.post("hotels/:hotel_id/rooms",
    authmiddleware,
    requireRole('admin'),
    requireHotelowner,
    createRoomcontroller
);

export default roomrouter;