import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authenticated = async (req,res,next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const token=req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id).select('-password')
            if (!user){
                throw new Error ('User not found')
            }
            req.currentUser=user
            next();
        } catch (error) {
            return res.status(401).json({message: "Invalid token, authorization denied",error: error.message,});   
        }
    }
    else{
        res.status(401).json({message:"No token, authorization denied"})
    }    
}