import bcrypt from 'bcryptjs'
import { decode } from './jwt.js';
import { NextFunction,Request,Response } from "express";
import APIError from './error/APIError.js';

export async function encodePassword(password:string) {
    const salt = process.env.BCRYPT_SALT
    return await bcrypt.hash(password, Number(salt));
};

export async function passwordMatch(password: string, passwordHash: string) {
    return bcrypt.compare(password,passwordHash);
};

export async function isConnected(req: Request,res: Response, next: NextFunction){
    try{
        const tokenSession: any = decode(req.session.token)
        if(tokenSession && typeof tokenSession === "object") next()
        else{
            res.status(401).redirect('/v1/admin/s/')
        }        
    }
    catch(err){
        res.status(401).redirect('/v1/admin/s/')
    }
}
