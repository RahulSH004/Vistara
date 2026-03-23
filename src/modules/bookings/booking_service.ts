import z from "zod"
import { bookingschema } from "./booking_schema.js"
import { bookings, rooms } from "../../db/schema.js"
import { db } from "../../db/connection.js";
import { eq, and, lt, gt, lte, ne, gte } from "drizzle-orm";
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
    const today  = new Date();
    if(checkInDate < today){
        throw new ApiError(400, "checkIn date must be today or after today")
    }
    if(checkOutDate <= checkInDate){
        throw new ApiError(400, "checkout date must be after the checkIn")
    }
    const checkInDateStr = checkInDate.toISOString().slice(0, 10);
    const checkOutDateStr = checkOutDate.toISOString().slice(0, 10);
    const overlapquery = await db.select()
        .from(bookings)
        .where(
            and (
            eq(bookings.room_id, roomId),
            lt(bookings.check_in_date , checkOutDateStr),
            gt(bookings.check_out_date , checkInDateStr),
            ne(bookings.status, "cancelled")
        )
    )
    if(overlapquery.length > 0){
        throw new ApiError(409 , "Room is not available for selected dates");
    }
    const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    const pricepernights = parseFloat(room.price_per_night)
    const totalprice = nights * pricepernights

    const [booking] = await db.insert(bookings)
        .values({
            room_id: roomId,
            hotel_id: room.hotel_id,
            user_id,
            guests,
            check_in_date: checkInDateStr,
            check_out_date: checkOutDateStr,
            total_price: totalprice.toString(),
        }).returning({
            id: bookings.id,
            user_id: bookings.user_id,
            roomId: bookings.room_id,
            hotel_id: bookings.hotel_id,
            checkInDate: bookings.check_in_date,
            checkOutDate: bookings.check_out_date,
            guests: bookings.guests,
            totalprice: bookings.total_price,
            status: bookings.status,
            bookingDate: bookings.booking_date,
        })

    return booking;
}