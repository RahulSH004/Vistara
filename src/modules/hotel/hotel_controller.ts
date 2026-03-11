import { Request, Response } from "express";
import { createHotel } from "./hotel_service.js";
import { ApiError } from "../../utils/ApiError.js";

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