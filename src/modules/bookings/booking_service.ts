import z from "zod"
import { bookingschema } from "./booking_schema.js"
import { bookings, rooms } from "../../db/schema.js"
import { db } from "../../db/connection.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../../utils/ApiError.js";

type data = z.infer<typeof bookingschema>

export async function createbooking(data: data, user_id: string){

    const {roomId, checkInDate, checkOutDate, guests} = data;
    const [room] = await db.select()
        .from(rooms)
        .where(eq(rooms.id, roomId))
        .limit(1)
    if(!room){
        throw new ApiError(404, "Room Not Found , Check other rooms")
    }
    if(checkOutDate <= checkInDate){
        throw new ApiError(400, "checkout date must be after the checkIn")
    }
    const today  = new Date();
    if(checkInDate < today){
        throw new ApiError(400, "checkIn date must be today or after today")
    }
}