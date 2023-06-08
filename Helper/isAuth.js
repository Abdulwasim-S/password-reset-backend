import jwt from "jsonwebtoken";
import { logInUser } from "./mongooseValidator.js";

const isAuth=async(req,res,next)=>{
    let token;
    if(req.headers){
        try {
            token =await req.headers['x-auth-token']
            const decode = jwt.verify(token,process.env.SECRET_KEY);
            next();
        } catch (error) {
            console.log(error)
        }
    }
    if(!token){
        res.send("Access denied...")
    }

}
export {isAuth};