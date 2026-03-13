import { Router } from "express";
import { createRoomcontroller } from "./rooms_controller.js";
import { authmiddleware } from "../auth/auth_middleware.js";

const roomrouter = Router()

roomrouter.post("hotels/:hotel_id/rooms",authmiddleware,createRoomcontroller);

export default roomrouter;