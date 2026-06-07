import { z } from 'zod';
export declare const bookingschema: z.ZodObject<{
    roomId: z.ZodString;
    checkInDate: z.ZodCoercedDate<unknown>;
    checkOutDate: z.ZodCoercedDate<unknown>;
    guests: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=booking_schema.d.ts.map