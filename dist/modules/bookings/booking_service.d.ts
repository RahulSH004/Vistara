import z from "zod";
import { bookingschema } from "./booking_schema.js";
type data = z.infer<typeof bookingschema>;
export declare function createbooking(data: data, user_id: string): Promise<{
    id: string;
    user_id: string;
    roomId: string;
    hotel_id: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    totalprice: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    bookingDate: Date;
} | undefined>;
export declare function getbookings(user_id: string): Promise<{
    id: string;
    roomId: string;
    hotelId: string;
    hotelName: string | null;
    roomNumber: string | null;
    roomType: string | null;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    totalprice: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    bookingDate: Date;
}[]>;
export {};
//# sourceMappingURL=booking_service.d.ts.map