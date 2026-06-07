import { z } from "zod";
export declare const createRoomSchema: z.ZodObject<{
    room_number: z.ZodString;
    room_type: z.ZodString;
    price_per_night: z.ZodNumber;
    max_occupancy: z.ZodNumber;
}, z.core.$strip>;
export declare const filterschema: z.ZodObject<{
    minprice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxprice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=room_schema.d.ts.map