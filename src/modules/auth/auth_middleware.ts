import "dotenv/config"
import { Request, Response, NextFunction } from 'express'
import jwt, {JwtPayload} from "jsonwebtoken";
import { db } from "../../db/connection.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../../utils/ApiError.js";

interface TokenPayload extends JwtPayload {
    userId: string;
    email: string;
    role: string;
}
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
if (!ACCESS_TOKEN) throw new Error("ACCESS_TOKEN_SECRET is not defined");

export const authmiddleware = async (req: Request, res: Response, nxt: NextFunction) => {
    const authHeader = req.headers['authorization'];
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new ApiError(401, "UNAUTHORIZED");
        }
        console.log("authHeader", authHeader);
    try {
        
        const decode = jwt.verify(authHeader.replace("Bearer ", ""), ACCESS_TOKEN) as TokenPayload
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id , decode.userId))
            .limit(1);
        const currentuser = user[0];
        if(!currentuser){
            return res.status(401).json({
                messgae:"User not found",
            })
        }
        req.user = currentuser;
        nxt();
        
    } catch (error) {
        console.error("JWT verify error:", error);
        return nxt(new ApiError(401, "Invalid access token"));
    }
}