import { eq } from "drizzle-orm";
import { db } from "../../db/connection.js";
import { bookings } from "../../db/schema.js";
import { ApiError } from "../../utils/ApiError.js";


export async function cancelbooking(booking_id: string, user_id: string){

    //check if booking exists
    const [existingbooking] = await db.select({
        id: bookings.id,
        status: bookings.status,
        user_id: bookings.user_id,
    })
        .from(bookings)
        .where(eq(bookings.id, booking_id))
        .limit(1)
    if(!existingbooking){
        throw new ApiError(404, "Booking not found")
    }
    if(existingbooking.user_id !== user_id){
        throw new ApiError(403, "You are not authorized to cancel this booking")
    }
    const nonCancellableStatuses = ["completed", "cancelled"]

    if(nonCancellableStatuses.includes(existingbooking.status)){
        throw new ApiError(400, `Cannot cancel a ${existingbooking.status} status booking`)
    }
    const [updatedbooking] = await db.update(bookings)
    .set({
        status: "cancelled",
        cancelled_at: new Date(),
    })
    .where(eq(bookings.id, booking_id))
    .returning({
        id: bookings.id,
        status: bookings.status,
        cancelled_at: bookings.cancelled_at,
    })
    if(!updatedbooking){
        throw new ApiError(500, "Failed to cancel booking")
    }
    return updatedbooking;
}