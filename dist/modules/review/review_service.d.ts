import { z } from 'zod';
import { reviewSchema } from "./review_schema.js";
type reviewInput = z.infer<typeof reviewSchema>;
export declare function postreviews(data: reviewInput, user_id: string): Promise<{
    id: string;
    userId: string;
    hotelId: string;
    bookingId: string;
    rating: string;
    comment: string | null;
    createdAt: Date;
} | undefined>;
export {};
//# sourceMappingURL=review_service.d.ts.map