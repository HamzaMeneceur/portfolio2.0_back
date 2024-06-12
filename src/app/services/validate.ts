import {Schema} from 'joi'
import { Request, NextFunction } from "express";
export function validate(schema:Schema,dataKey:string){
    return(req:Request,next: NextFunction)=>{
        const data = dataKey ? req.body[dataKey] : req.body;
        next()
    }
}
