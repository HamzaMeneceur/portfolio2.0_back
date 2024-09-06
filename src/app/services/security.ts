import bcrypt from 'bcryptjs'
import { decode } from './jwt.js';
import { NextFunction,Request,Response } from "express";
import APIError from './error/APIError.js';

/**
 * 
 * @param password Besoin d'un mot de passe
 * @returns Le mot de passe et encrypté
 */
export async function encodePassword(password:string) {
    const salt = process.env.BCRYPT_SALT
    return await bcrypt.hash(password, Number(salt));
};

/**
 * 
 * @param password Password saisie par l'utilisateur
 * @param passwordHash Password en BDD
 * @returns Boolean
 */
export async function passwordMatch(password: string, passwordHash: string) {
    return bcrypt.compare(password,passwordHash);
};

export async function isConnected(req: Request,res: Response, next: NextFunction){
    try{
        const tokenSession: any = decode(req.session.token)
        if(tokenSession && typeof tokenSession === "object" && tokenSession.exp === 0){
            delete req.session.token
        }
        if(tokenSession && typeof tokenSession === "object") {
            console.log(tokenSession.exp)
            next()
        }
        else{
            res.status(401).redirect('/v1/admin/s/')
        }        
    }
    catch(err){
        res.status(401).redirect('/v1/admin/s/')
    }
}
