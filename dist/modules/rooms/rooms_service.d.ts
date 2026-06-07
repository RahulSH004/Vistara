import { z } from "zod";
import { createRoomSchema, filterschema } from "./room_schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
type CreateRoomInput = z.infer<typeof createRoomSchema> & {
    hotel_id: string;
};
export declare function createRoom(data: CreateRoomInput): Promise<ApiResponse<{
    id: string;
    hotel_id: string;
    roomNumber: string;
    roomType: string;
    price_per_night: string;
    maxOccupancy: number;
}>>;
type Filters = z.infer<typeof filterschema>;
export declare function gethotelwithrooms(filters: Filters, hotel_id: string): Promise<{
    hotel: {
        id: string;
        owner_id: string;
        name: string;
        description: string | null;
        city: string;
        country: string;
        amenities: unknown;
        rating: string;
        total_reviews: number;
        created_at: Date | null;
        updated_at: Date | null;
    };
    rooms: {
        id: string;
        hotel_id: string;
        room_number: string;
        room_type: string;
        price_per_night: string;
        max_occupancy: number;
        created_at: Date | null;
        updated_at: Date | null;
    }[];
}>;
export {};
//# sourceMappingURL=rooms_service.d.ts.map