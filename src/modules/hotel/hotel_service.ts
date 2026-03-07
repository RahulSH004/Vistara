import z from "zod"
import {db} from "../../db/connection.js"
import { createhotelschema } from "./hotel_types.js"

export async function createHotel(data: z.infer <typeof createhotelschema>){
    const parsedData = createhotelschema.safeParse(data);
    if(!parsedData.success){
    }
}