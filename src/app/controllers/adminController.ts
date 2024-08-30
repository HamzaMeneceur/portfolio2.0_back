import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { NextFunction,Request,Response } from "express";
import { encodePassword } from "../services/security.js";
import errorHandler from "../services/error/errorHandler.js";
import APIError from "../services/error/APIError.js";

export default {
    async renderSigninPage(req:Request,res: Response,next: NextFunction){
        try{
            console.log('je suis pret a envoyer le rendu')
            res.render('adminAuth/signin')
        }
        catch(err){
            console.log('je suis la')
            console.log(err)
        }
    },
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
            console.log("C'est ok") 
        }
        else {
            error = new APIError('Email déjà présente en base de données', 409);
            next(error)
        }
    },
    async signup(req:Request,res: Response){
            let error;
            console.log("APIerror => ", errorHandler)
            const user = req.body
            console.log(user)
            if(user.password && user.email){
                user.password = await encodePassword(user.password);
                const hashUser = user
                const result = await adminDataMapper.addUser(hashUser);
                console.log(user)
                res.status(201).redirect('/v1/admin/s/')
            } else {
                error = new APIError('Donnée manquante en entrer', 500)
                errorHandler
            }
            
                
            
    },
    async renderSignupPage(req:Request,res: Response,next: NextFunction){
            let error;
            res.status(200).render('adminAuth/signup')
    }
}