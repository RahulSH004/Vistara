import 'dotenv/config';
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { LoginUserInput, RegisterUserInput } from "./types.js";
import { db } from "../../db/connection.js";
import { refreshTokens, users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN = process.env.REFRESH_SECRET as string;

async function generateAccessToken(userId: string) {
    const accesstoken = jwt.sign({userId}, JWT_SECRET, {expiresIn: "30m"});
    const refreshtoken = jwt.sign({userId}, REFRESH_TOKEN, {expiresIn: "7d"});
    await db.insert(refreshTokens).values({
        token: refreshtoken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    return {accesstoken, refreshtoken};
}

export async function registerUser(data: RegisterUserInput){
    const {name, email, password, phone} = data
    try {
        //check if user already exists
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if(existingUser){
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db
            .insert(users)
            .values({
                name,
                email,
                password_hash: hashedPassword,
                phone,
            })
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
            });
        if(!newUser){
            throw new Error("Failed to create user");
        }
        const tokens = await generateAccessToken(newUser.id);

            const token = jwt.sign(
                {userId: newUser?.id},
                secret,
                {expiresIn: "7d"}
            );
            return { user: newUser, token };
    }catch(error){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An error occurred during registration");
        }
    }
}

export async function loginUser(data: LoginUserInput){
    const {email, password} = data;

    try{
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if(!isPasswordValid){
            throw new Error("Invalid email or password");
        }

        const secret = process.env.JWT_SECRET as string;
        
        const token = jwt.sign(
            {userId: user.id},
            secret,
            {expiresIn: "7d"}
        );
        return { user: {name: user.name, email: user.email}, token};
    }
    catch(error){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An error occurred during login");
        }
    }
}
export async function logoutuser(data: {token: string}){
    const {token} = data;
    const secret = process.env.JWT_SECRET as string;
    try{
        const payload = jwt.verify(token, secret) as {userId: number};
    }catch(error){
        throw new Error("Invalid token");
    }
}
