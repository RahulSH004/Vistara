import {z} from "zod";

export const createhotelschema = z.object({
    name: z.string().min(2, "mininum 2 words"),
    description: z.string().min(1, "description is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
    amenities: z.array(z.string()).nonempty("amenities are required"),
})

export const filterschema = z.object({
    city:  z.string().optional(),
    country: z.string().optional(),
    minrating: z.coerce.number().optional(),
    minprice: z.coerce.number().optional(),
    maxprice: z.coerce.number().optional()
})