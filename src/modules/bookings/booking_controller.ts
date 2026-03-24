import { Request, Response, NextFunction } from "express";
import { bookingschema } from "./booking_schema.js";
import { ApiError } from "../../utils/ApiError.js";
import { createbooking } from "./booking_service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function createBookingController(req: Request, res: Response, next: NextFunction){
    try{
        const user = req.user;
        const result = bookingschema.safeParse(req.body);
        if(!result.success){
            return next(new ApiError(400, result.error.message));
        }
        const booking = await createbooking(result.data, user?.id as string)
        return res.status(201).json(
            new ApiResponse(booking, null)
        )
    }catch(error){
        next(error)
    }
}