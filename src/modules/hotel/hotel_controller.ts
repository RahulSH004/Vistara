import { NextFunction, Request, Response } from "express";
import { createHotel, getHotels } from "./hotel_service.js";
import { ApiError } from "../../utils/ApiError.js";
import { filterschema } from "./hotel_types.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { nextTick } from "node:process";

export async function createHotelController(req: Request, res: Response){
    try{
        const user = req.user;
        if(!user){
            throw new ApiError(401, "UNAUTHORIZED");
        }
        const result = await createHotel(req.body, user);
        res.status(201).json(result);
    }catch(error){
        if(error instanceof ApiError){
            res.status(error.statuscode).json({error: error.message});
        }else{
            res.status(500).json({error: "An error occurred during hotel creation"});
        }
    }
}
export async function getHotelcontroller(req: Request, res: Response, next: NextFunction){
    try {
        const parsed = filterschema.safeParse(req.query);
        if(!parsed.success){
            throw new ApiError(400, parsed.error.message);
        }
        const data = await getHotels(parsed.data)
        return res.status(200).json(
            new ApiResponse(data,null)
        )
    } catch (error) {
        next(error)
    }
}