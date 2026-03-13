import {z} from "zod";

export const createRoomSchema = z.object({
    room_number: z.string().min(1, "Room number is required"),
    room_type: z.string().min(1, "Room type is required"),
    price_per_night: z.number().min(1, "Price per night is required"),
    max_occupancy: z.number().min(1, "Max occupancy is required"),
})