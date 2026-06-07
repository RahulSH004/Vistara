import { db } from "../../db/connection.js";
import { ApiError } from "../../utils/ApiError.js";
import { hotels } from "../../db/schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { and, gte, ilike } from "drizzle-orm";
export async function createHotel(data, user) {
    try {
        const owner_id = user?.id;
        const { name, description, city, country, amenities } = data;
        const [newHotel] = await db.insert(hotels)
            .values({
            owner_id,
            name,
            description,
            city,
            country,
            amenities,
        })
            .returning({
            id: hotels.id,
            name: hotels.name,
            description: hotels.description,
            city: hotels.city,
            country: hotels.country,
            amenities: hotels.amenities,
            rating: hotels.rating,
            total_reviews: hotels.total_reviews,
            created_at: hotels.created_at,
            updated_at: hotels.updated_at,
        });
        if (!newHotel) {
            throw new ApiError(401, "FAILED_TO_CREATE_HOTEL");
        }
        return new ApiResponse(newHotel, null);
    }
    catch (error) {
        console.error("createHotel error:", error);
        throw new ApiError(500, "INTERNAL_SERVER_ERROR");
    }
}
export async function getHotels(filters) {
    try {
        const hotelconditions = [];
        if (filters.city)
            hotelconditions.push(ilike(hotels.city, `%${filters.city}%`));
        if (filters.country)
            hotelconditions.push(ilike(hotels.country, `%${filters.country}%`));
        if (filters.minrating !== undefined)
            hotelconditions.push(gte(hotels.rating, String(filters.minrating)));
        await db.select().from(hotels)
            .$dynamic()
            .where(and(...hotelconditions));
        return hotelconditions.length;
    }
    catch (error) {
        console.error("getHotel error:", error);
        throw new ApiError(500, "INTERNAL_SERVER_ERROR");
    }
}
//# sourceMappingURL=hotel_service.js.map