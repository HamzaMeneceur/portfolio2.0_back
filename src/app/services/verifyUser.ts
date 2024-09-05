import { NextFunction,Request,Response } from "express";
import APIError from "../services/error/APIError.js";
import adminDataMapper from "../dataMappers/adminDataMapper.js";
declare module "express-session" {
    interface SessionData {
        error : string
        token : string
        limitReached: boolean;
        limitExpiration? : number | null;
    }
}
export async function verifyUser(req:Request,res: Response,next: NextFunction) {
    let error;
    const email = req.body
    const result = await adminDataMapper.ifUser(email);
    console.log('controller', result)
    if(result){
        error = new APIError("L'email que vous avez entré est déjà utilisé.", 409);
        delete req.session.error
        req.session.error = error.message
        console.log("Dans le service => ", req.session.error)
        res.status(409).redirect("/v1/admin/s/signup")
    }
    else {
    next()
    }
 }