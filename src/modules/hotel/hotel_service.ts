import z from "zod"
import {db} from "../../db/connection.js"
import { createhotelschema } from "./hotel_types.js"
import { ApiError } from "../../utils/ApiError.js";
import { Request } from "express";
import { hotels } from "../../db/schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


export async function createHotel(data: z.infer <typeof createhotelschema>, user: Request['user']){

    const parsedData = createhotelschema.safeParse(data);
    if(!parsedData.success){
        throw new ApiError(400, "INVALID_REQUEST");
    }
    try {
        const owner_id = user?.id as string;
        const {name, description, city, country, amenities} = parsedData.data;
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
        if(!newHotel){
            throw new ApiError(401, "FAILED_TO_CREATE_HOTEL");
        }
        return new ApiResponse(newHotel, null);
    } catch (error) {
        throw new ApiError(500, "INTERNAL_SERVER_ERROR");
    }
}
