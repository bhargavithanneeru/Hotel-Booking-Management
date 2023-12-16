import jwt from "jsonwebtoken"
import { createError} from "../utils/error.js"

export const verifyToken = (req, res, next)=>{
    next()
    // const token = req.cookies.access_token
    // //console.log("token",req.cookies.access_token)
    // if(!token){
    //     return next(createError(401, "You are not authenticated!"))
    // }

    // jwt.verify(token, process.env.SECRET, (err, user)=>{
    //     //we have information and error in the cookies
    //     if(err) return next(createError(401, "Token is not valid!"))
    //     //we can use any variable here let us take user as we have not used yet(req.user)
    //     req.user=user
    //     next()
    // })
}


export const verifyUser = (req, res, next)=>{
    verifyToken(req, res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }
        else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}

export const verifyAdmin = (req, res, next)=> {
    next()
    // verifyToken(req, res, next,()=>{
    //     if(true || req.user.isAdmin){
    //         next();
    //     }
    //     else{
    //         return next(createError(403, "You are not authorized!"))
    //     }
    // })
}










