import { z } from "zod";
export declare const createhotelschema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    city: z.ZodString;
    country: z.ZodString;
    amenities: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const filterschema: z.ZodObject<{
    city: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    minrating: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=hotel_types.d.ts.map