import 'dotenv/config';
import { registerUserSchema, loginUserSchema } from "./types.js";
import { z } from "zod";
export declare function registerUser(data: z.infer<typeof registerUserSchema>): Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        role: "customer" | "admin";
        phone: string | null;
    };
    tokens: {
        accesstoken: string;
        refreshtoken: string;
    };
}>;
export declare function loginUser(data: z.infer<typeof loginUserSchema>): Promise<{
    accesstoken: string;
    refreshtoken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: "customer" | "admin";
    };
}>;
export declare function logoutuser(data: {
    refreshtoken: string;
}): Promise<void>;
export declare function refreshAccessToken(data: {
    refreshtoken: string;
}): Promise<{
    accesstoken: string;
    refreshtoken: string;
}>;
//# sourceMappingURL=auth_service.d.ts.map