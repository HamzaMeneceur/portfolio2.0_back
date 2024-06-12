import xss from "xss";
import { Request,Response,NextFunction } from "express";
export default function
    bodyProtect(req:Request,res:Response,next:NextFunction){
        if(req.body) {
            for(let property in req.body){
                req.body[property] = xss(req.body[property])
            }
        }
        next()
    }
