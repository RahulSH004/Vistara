import {string, z} from "zod";

export const createhotelschema = z.object({
    name: z.string().min(2, "mininum 2 words"),
    description: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    amenities: z.array(z.string()).nonempty()
})