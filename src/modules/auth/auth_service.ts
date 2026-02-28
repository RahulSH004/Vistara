import 'dotenv/config';
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { RegisterUserInput } from "./types.js";
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