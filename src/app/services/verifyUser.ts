import { NextFunction,Request,Response } from "express";
import APIError from "../services/error/APIError.js";
import adminDataMapper from "../dataMappers/adminDataMapper.js";
export async function verifyUser(req:Request,res: Response,next: NextFunction) {
    let error;
    const email = req.body
    const result = await adminDataMapper.ifUser(email);
    console.log('controller', result)
    if(!result.exists){
        error = new APIError('Email déjà présente en base de données', 409);
        next(error)
    }
    else {
    next()
    }
 }