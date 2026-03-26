import {z} from 'zod'
import { reviewSchema } from "./review_schema.js"
import { db } from '../../db/connection.js';
import { bookings, hotels, reviews } from '../../db/schema.js';
import { and, eq } from 'drizzle-orm';
import { ApiError } from '../../utils/ApiError.js';

type reviewInput = z.infer<typeof reviewSchema>

export async function postreviews(data: reviewInput, user_id: string){
    const {bookingId,rating, comment} = data;

    const [checkbooking] = await db.select()
        .from(bookings)
        .where(and(
            eq(bookings.id, bookingId),
            eq(bookings.user_id, user_id),
        ))
        .limit(1)
    if(!checkbooking){
        throw new ApiError(403, "FORBIDDEN")
    }
    if(checkbooking.status !== "confirmed"){
        throw new ApiError(403, "BOOKING_NOT_ELIGIBLE")
    }
    if(new Date(checkbooking.check_out_date) >= new Date()){
        throw new ApiError(403, "Checkout date has not passed yet")
    }
    const [checkreviewd] = await db.select()
        .from(reviews)
        .where(eq(reviews.booking_id, bookingId))
        .limit(1)
    if(checkreviewd){
        throw new ApiError(400, "Already Reviewd")
    }
    const [hotel] = await db.select()
        .from(hotels)
        .where(eq(hotels.id, checkbooking.hotel_id))
        .limit(1)

    const currentRating = parseFloat(hotel?.rating ?? '0')
    const currentTotal = hotel?.total_reviews ?? 0

    const new_rating = ((currentRating * currentTotal) + rating) / (currentTotal + 1)
    const newTotalReviews = currentTotal + 1

    
    const result = await db.transaction(async(tx) => {
        const [insertReview] = await tx.insert(reviews).values({
            booking_id: checkbooking.id,
            hotel_id: checkbooking.hotel_id,
            user_id,
            rating,
            comment,
        }).returning({
            id: reviews.id,
            userId: reviews.user_id,
            hotelId: reviews.hotel_id,
            bookingId: reviews.booking_id,
            rating: reviews.rating,
            comment: reviews.comment,
            createdAt: reviews.created_at,
        })
        await tx.update(hotels)
            .set({rating: new_rating.toFixed(2),
                 total_reviews: newTotalReviews })
            .where(eq(hotels.id, checkbooking.hotel_id))
        
        return insertReview;
    })
    return result;
}
