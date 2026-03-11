import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/ApiError.js";

export async function createHotelMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const user = req.user;
        if(!user || user.role !== "admin"){
            throw new ApiError(401, "UNAUTHORIZED");
        }
        next();
    }catch(error){
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "An error occurred during hotel creation");
    }
}