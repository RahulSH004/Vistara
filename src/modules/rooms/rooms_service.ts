import { db } from "../../db/connection.js";
import {z} from "zod";
import { rooms } from "../../db/schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { createRoomSchema } from "./room_schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

type CreateRoomInput = z.infer<typeof createRoomSchema> & {
    hotel_id: string;
}

export async function createRoom(data: CreateRoomInput){
    try{
        const hotel_id = data.hotel_id;
        const {room_number, room_type, price_per_night, max_occupancy} = data;
        const [newRoom] = await db.insert(rooms)
            .values({
                hotel_id,
                room_number,
                room_type_id: room_type,
                price_per_night,
                max_occupancy,
            })
            .returning({
                id: rooms.id,
                hotel_id: rooms.hotel_id,
                roomNumber: rooms.room_number,
                roomType: rooms.room_type_id,
                price_per_night: rooms.price_per_night,
                maxOccupancy: rooms.max_occupancy,
            });
        if(!newRoom){
            throw new ApiError(401, "Failed to Create the Room, Try Again")
        }
        return new ApiResponse(newRoom,null);
    }catch(error){
        console.error("createRoom error:", error);
        if(error instanceof ApiError) throw error;
        throw new ApiError(500, "Internal Server Error");
    }
}