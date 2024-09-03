import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { NextFunction,Request,Response } from "express";
import { encodePassword, passwordMatch } from "../services/security.js";
import APIError from "../services/error/APIError.js";


export default {
    async renderPrivacyPolicy(req: Request,res: Response,next: NextFunction){
        try{
            res.status(200).render('legal/privacyPolicy');
        }
        catch(err){
            console.log(err)
        }
    },
    async renderTermsOfUse(req: Request,res: Response,next: NextFunction){
        try{
            res.status(200).render('legal/termsOfUse');
        }
        catch(err){
            console.log(err)
        }
    },
    async renderSigninPage(req:Request,res: Response,next: NextFunction){
        try{
            res.status(200).render('adminAuth/signin')
        }
        catch(err){
            console.log(err)
        }
    },
    async renderProject(req: Request,res: Response,next: NextFunction){
        try{
            res.status(200).render('gestion/project')
        }
        catch(err){
            console.log(err)
        }
    },
    async renderNotFound(req: Request,res: Response,next: NextFunction){
        try{
            res.status(404).send("404 not found")
        }
        catch(err){
            console.log(err)
        }
    },
    async authUser(req:Request,res: Response,next: NextFunction){
        try{
            const {email, password} = req.body;
            const result : any = await adminDataMapper.authUser(email)
            const passCheck = result.password;
            const user = await passwordMatch(password, passCheck)
            if(user){
                console.log('result => ' + result + 'user ' + user)
            }
            else{
                console.log(user)
            }
        }
        catch(err){
            console.log(err)
        }

    },
    async signup(req:Request,res: Response, next: NextFunction){
            const error = {
                message : 'Le mot de passe ne correspond pas'
            };
            const user = req.body
            for(const userIn in user){
                console.log(`Le conteneur est ${userIn} le contenu ${user[userIn]}`)
            }
            if(user.password !== user.confirm){
                delete req.session.error
                req.session.error = error.message
                res.status(406).redirect('/v1/admin/s/signup')
            }
                else if(user.password === user.confirm && user.email){
                    user.password = await encodePassword(user.password);
                    const hashUser = user
                    await adminDataMapper.addUser(hashUser);
                    res.status(201).redirect('/v1/admin/s/')
            

            } else {
                const alert = new APIError('Donnée manquante en entrer', 500)
                next(error)
            }
            
                
            
    },
    async renderSignupPage(req:Request,res: Response,next: NextFunction){
            let error;
                const errorMessage = [req.session.error]
                res.status(200).render('adminAuth/signup', {msg : errorMessage[0]})

    }
}