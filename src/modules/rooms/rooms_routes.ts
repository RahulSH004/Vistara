import { Router } from "express";
import { createRoomcontroller } from "./rooms_controller.js";

const roomrouter = Router()

roomrouter.post("hotels/:hotel_id/rooms", createRoomcontroller);

export default roomrouter;