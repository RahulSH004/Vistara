import { z } from "zod";
export declare const registerUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    role: z.ZodEnum<{
        customer: "customer";
        admin: "admin";
    }>;
    phone: z.ZodString;
}, z.core.$strip>;
export declare const loginUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=types.d.ts.map