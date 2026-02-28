import 'dotenv/config';
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { LoginUserInput, RegisterUserInput } from "./types.js";
import { db } from "../../db/connection.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";



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

            const secret = process.env.JWT_SECRET as string;

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