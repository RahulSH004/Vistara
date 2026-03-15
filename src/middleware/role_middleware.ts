import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";


export function requireRole(...allowedRoles: Array<"admin" | "customer">){
    return(req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if(!user){
            return next(new ApiError(401, "UnAuthrized"));
        }
        if(!allowedRoles.includes(user.role)){
            return next(new ApiError(403, "Forbidden"));
        }
        next();
    };
}