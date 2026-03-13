import { Request, Response } from "express";
import { createRoom } from "./rooms_service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export async function createRoomcontroller(req:Request, res: Response){
    try{
        const user = req.user;
        if(!user){
            throw new ApiError(401, "Unauthrized")
        }
        const hotel_id = req.params.hotel_id;
        const result = await createRoom({...req.body, hotel_id});
        return new ApiResponse(result,null)
    }catch(error){
        throw new ApiError(500, "Server Issue");
    }
}