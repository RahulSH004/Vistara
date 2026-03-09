import { Request, Response } from "express";
import { registerUser,loginUser,logoutuser } from "./auth_service.js";
import { ApiError } from "../../utils/ApiError.js";


export async function register(req: Request, res: Response){
    try{
        const result = await registerUser(req.body);
        res.status(201).json(result);
    }catch(error){
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "An error occurred during registration"});
        }
    }
}

export async function login(req: Request, res: Response){
    try{
        const result = await loginUser(req.body);
        res.status(200).json(result);
    }catch(error){
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "An error occurred during login"});
        }
    }
}
export async function logout(req: Request, res: Response){
    try{
        await logoutuser(req.body);
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({error: "An error occurred during logout"});
        }
    }
}
export async function getMe(req: Request, res: Response){
    if(!req.user){
        throw new ApiError(401, "Not Authenticated")
    }
    const {password , ...notpassword} = req.user;
    return res.status(200).json({
            user: notpassword,
        })
    
}