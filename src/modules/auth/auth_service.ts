import 'dotenv/config';
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { registerUserSchema, loginUserSchema } from "./types.js";
import { db } from "../../db/connection.js";
import { refreshTokens, users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { ApiError } from '../../utils/ApiError.js';


const  ACCESS_TOKEN = process.env. ACCESS_TOKEN_SECRET as string;
const  REFRESH_TOKEN = process.env.  REFRESH_TOKEN_SECRET as string;

async function generateAccessToken(userId: string) {
    const accesstoken = jwt.sign({userId},  ACCESS_TOKEN, {expiresIn: "30m"});
    const refreshtoken = jwt.sign({userId}, REFRESH_TOKEN, {expiresIn: "7d"});
    await db.insert(refreshTokens).values({
        token: refreshtoken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    return {accesstoken, refreshtoken};
}

export async function registerUser(data: z.infer<typeof registerUserSchema>){
    const parsedData = registerUserSchema.safeParse(data);
    if(!parsedData.success){
        throw new ApiError(400,"INVALID_REQUEST")
    }
    const {name, email, password, phone, role} = parsedData.data;
    try {
        //check if user already exists
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if(existingUser){
            throw new ApiError(400,"EMAIL_ALREADY_EXISTS");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [newUser] = await db
            .insert(users)
            .values({
                name,
                email,
                password: hashedPassword,
                role,
                phone,
            })
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                phone: users.phone,
            });
        if(!newUser){
            
            throw new Error("Failed to create user");
        }
        const tokens = await generateAccessToken(newUser.id);

        return { user: newUser, tokens };

    }catch(error){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An error occurred during registration");
        }
    }
}

export async function loginUser(data: z.infer<typeof loginUserSchema>){
    const parsedData = loginUserSchema.safeParse(data);
    if(!parsedData.success){
        throw new Error(parsedData.error.message);
    }
    const {email, password} = parsedData.data;

    try{
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid email or password");
        }

        const tokens = await generateAccessToken(user.id);
        
        return {
            user: {
                id: user.id,
                name: user.name, 
                email: user.email,
                role: user.role
            },
             ...tokens
            };
    }
    catch(error){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An error occurred during login");
        }
    }
}
export async function logoutuser(data: {refreshtoken: string}){
    const {refreshtoken} = data;
    let  payload: {userId : string};
    try{
        payload = jwt.verify(refreshtoken, REFRESH_TOKEN) as {userId: string};
        await db.delete(refreshTokens).where(eq(refreshTokens.token, refreshtoken));
    }
    catch(error){
        throw new Error("Logout issue failed");
    }
}


export async function refreshAccessToken(data: {refreshtoken: string}){
    const {refreshtoken} = data;
    let payload: {userId: string};
    try{
        payload = jwt.verify(refreshtoken, REFRESH_TOKEN) as {userId: string};
        const [stored]= await db
            .select()
            .from(refreshTokens)
            .where(eq(refreshTokens.token, refreshtoken))
            .limit(1);
        if(!stored){
            throw new Error("Refresh token revoked or expired");
        }
        await db.delete(refreshTokens).where(eq(refreshTokens.token, refreshtoken));
        const tokens = await generateAccessToken(payload.userId);
        return tokens;
    }
    catch(error){
        throw new Error("Failed to refresh access token");
    }
}
