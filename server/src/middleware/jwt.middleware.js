// jwt.middleware.js
import JWT from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";

const jwtAuth=(req,res,next)=>{
    // read token from header
    const token=req.headers["authorization"];

    if(!token){ // authorization header is empty
        return res.status(401).json({ message: "Unauthorized"});
    }

    try {
        //  jwt.verify(token, secretOrPublicKey, [options, callback])
        const payload=JWT.verify(token,SECRET_KEY); //check token validity
        req.userId=payload.userId; // used later
        req.userRole=payload.role; // used later
        // console.log(payload);
    } catch (error) {
        return res.status(401).json({ message: "Token validation failed"});        
    }
    next(); // calling next middleware in pipeline
}
export default jwtAuth;