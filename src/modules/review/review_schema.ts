import {z} from 'zod';

export const reviewSchema = z.object({
    bookingId: z.string(),
    review: z.number().min(1).max(5),
    comment: z.string().optional() 
})

