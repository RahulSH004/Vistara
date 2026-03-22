import { db } from "../../db/connection.js";
import {z} from "zod";
import { Request, Response } from "express";
import { hotels, rooms } from "../../db/schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { createRoomSchema, filterschema } from "./room_schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { and, eq, gte, lte } from "drizzle-orm";

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
                room_type,
                price_per_night,
                max_occupancy,
            })
            .returning({
                id: rooms.id,
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
        console.error("createRoom error:", error);
        if(error instanceof ApiError) throw error;
        throw new ApiError(500, "Internal Server Error");
    }
}

type Filters = z.infer<typeof filterschema>

export async function gethotelwithrooms(filters: Filters, hotel_id: string){
    
    try {
        const [hotel] = await db.select()
            .from(hotels)
            .where(eq(hotels.id, hotel_id))
            .limit(1)
    
        if(!hotel)
            throw new ApiError(404, "Page Not Found")
        const conditions = [eq(rooms.hotel_id, hotel_id)]
    
        if (filters.minprice !== undefined) conditions.push(gte(rooms.price_per_night, String(filters.minprice)));
        if (filters.maxprice !== undefined) conditions.push(lte(rooms.price_per_night, String(filters.maxprice)));
    
        const roomsfilter = await db.select()
            .from(rooms)
            .where(and(...conditions))
    
        return {hotel, rooms: roomsfilter}
    } catch (error) {
        console.error("error",error)
        throw new ApiError(500, "Internal Server Error");
    }
}