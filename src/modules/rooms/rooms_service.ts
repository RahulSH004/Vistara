import { db } from "../../db/connection.js";
import {z} from "zod";
import { rooms } from "../../db/schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { createRoomSchema } from "./room_schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function createRoom(data: z.infer<typeof createRoomSchema>){
    const parsedData = createRoomSchema.safeParse(data);
    if(!parsedData.success){
        throw new ApiError(400, "INVALID_REQUEST");
    }
    try{
        const {room_number, room_type, price_per_night, max_occupancy} = parsedData.data;
        const [newRoom] = await db.insert(rooms)
            .values({
                room_number,
                room_type,
                price_per_night: price_per_night.toString(),
                max_occupancy,
            })
            .returning({
                id: rooms.room_id,
                hotel_id: rooms.hotel_id,
                roomNumber: rooms.room_number,
                roomType: rooms.room_type,
                price_per_night: rooms.price_per_night,
                maxOccupancy: rooms.max_occupancy,
            });
        if(!newRoom){
            throw new ApiError(401, "Failed to Create the Room, Try Again")
        }
        return new ApiResponse(newRoom,null);
    }catch(error){
        throw new ApiError(500, "Internal Server Error");
    }
}