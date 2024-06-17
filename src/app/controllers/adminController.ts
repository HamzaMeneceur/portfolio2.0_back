import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { NextFunction,Request,Response } from "express";
import { encodePassword } from "../services/security.js";
import APIError from "../services/error/APIError.js";


export default {
    async haveUser(req:Request,res: Response,next: NextFunction){
        try{
            const result :any[] = await adminDataMapper.getUser()
            console.log('i here')
            res.status(200).json(result)
        }
        catch(err){
            console.log(err)
        }

    },
    async verifyUser(req:Request,res: Response,next: NextFunction){
        let error;
        const email = req.body
        const result = await adminDataMapper.ifUser(email);
        console.log('controller', result)
        if(!result.exists){
            res.status(200).json('Email déjà enregistré')    
        }
        else {
            error = new APIError('Email déjà présente en base de données', 409);
            next(error)
        }
    },
    async signup(req:Request,res: Response,next: NextFunction){
            let error;
            const user = req.body

            if(user.password && user.email){
                user.password = await encodePassword(user.password);
                const hashUser = user
                const {error,result} = await adminDataMapper.addUser(hashUser);
                console.log(user)
                res.status(201).json(result); 
            } else {
                error = new APIError('Donnée manquante en entrer', 500)
                next(error)
            }
            
                
            
    }
}