import { NextFunction, Request, Response } from "express";
import { createRoom, gethotelwithrooms } from "./rooms_service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { createRoomSchema, filterschema } from "./room_schema.js";

export async function createRoomcontroller(req:Request, res: Response, next: NextFunction){
    try{
        const result = createRoomSchema.safeParse(req.body);
        if (!result.success) {
            return next(new ApiError(400, result.error.message));
        }
        const hotel_id = req.params.hotel_id as string;
        if (!hotel_id) return next(new ApiError(400, "Hotel ID missing"));
        const room = await createRoom({...result.data, hotel_id});
        return res.status(201).json(
            new ApiResponse(room,null)
        )
    }catch(error){
        next(error)
    }
}
export async function gethotelwithroomscontroller(req: Request, res: Response, next: NextFunction){
    try {
        const hotel_id  = req.params.hotel_id
        if(!hotel_id){
            throw new ApiError(404, "Invaild hotel_id")
        }
        const parsed = filterschema.safeParse(req.query);
        if(!parsed.success){
            throw new ApiError(400, parsed.error.message)
        }
        const result = await gethotelwithrooms(parsed.data)
        return res.status(200).json(
            new ApiResponse(result,null)
        )
    
    } catch (error) {
        next(error);
    }
}