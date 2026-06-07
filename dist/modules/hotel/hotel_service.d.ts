import z from "zod";
import { createhotelschema, filterschema } from "./hotel_types.js";
import { Request } from "express";
import { ApiResponse } from "../../utils/ApiResponse.js";
export declare function createHotel(data: z.infer<typeof createhotelschema>, user: Request['user']): Promise<ApiResponse<{
    id: string;
    name: string;
    description: string | null;
    city: string;
    country: string;
    amenities: unknown;
    rating: string;
    total_reviews: number;
    created_at: Date | null;
    updated_at: Date | null;
}>>;
type Filters = z.infer<typeof filterschema>;
export declare function getHotels(filters: Filters): Promise<number>;
export {};
//# sourceMappingURL=hotel_service.d.ts.map