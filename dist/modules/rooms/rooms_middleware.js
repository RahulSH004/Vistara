import { ApiError } from "../../utils/ApiError.js";
import { db } from "../../db/connection.js";
import { hotels } from "../../db/schema.js";
import { eq } from "drizzle-orm";
export async function requireHotelowner(req, res, next) {
    try {
        const user = req.user;
        const hotelId = req.params.hotel_id || req.body.hotel_id;
        if (!user)
            throw new ApiError(401, "Unauthenticated");
        if (!hotelId)
            throw new ApiError(400, "Hotel_ID Required");
        const [hotel] = await db
            .select({ ownerId: hotels.owner_id })
            .from(hotels)
            .where(eq(hotels.id, hotelId))
            .limit(1);
        if (!hotel) {
            throw new ApiError(404, "Hotel not found");
        }
        if (hotel.ownerId !== user.id) {
            throw new ApiError(403, "Not Hotel Owner");
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=rooms_middleware.js.map