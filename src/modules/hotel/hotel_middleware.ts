import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/ApiError.js";

export async function createHotelMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const user = req.user;
        console.log(user);
        console.log(user?.role);
        if(!user || user.role !== "admin"){
            throw new ApiError(401, "FORBIDDEN");
        }
        next();
    }catch(error){
        if (error instanceof ApiError) return next(error);
        return next(new ApiError(500, "An error occurred during hotel creation"));
    }
}