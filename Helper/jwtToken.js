import jwt from "jsonwebtoken";
import {} from 'dotenv/config.js'

export async function generateToken(value){
    const token=jwt.sign(value,process.env.SECRET_KEY)
    return token
}