import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { NextFunction,Request,Response } from "express";

export default {
    async haveUser(req:Request,res: Response,next: NextFunction){
        try{
            const result :any[] = await adminDataMapper.getUser()
            res.status(200).json(result)
        }
        catch(err){
            console.log(err)
        }

    },
    async signup(req:Request,res: Response,next: NextFunction){
        try{
            const user = req.body;
            
        }
        catch(err){
            console.log(err)
        }
    }
}