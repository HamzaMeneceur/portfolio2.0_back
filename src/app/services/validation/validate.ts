import {Schema} from 'joi'
import { Request,Response, NextFunction } from "express";
import APIError from '../error/APIError.js';
export function validate(schema:Schema,dataKey?:string){
    return(req:Request,res: Response,next: NextFunction)=>{

        const data = (dataKey) ? req.body[dataKey] : req.body;
        const error = schema.validate(data)

        

        if(error && error.error?.details) {
            
            for(const a of error.error?.details){
                switch(a.context?.key){
                    case 'password':
                        req.session.error= 'Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule.';
                        break;
                    case 'email':
                        req.session.error = `Le format de l'adresse email est incorrect, veuillez la ressaisir.`;
                        break;
                }
            }
        }
        next()
    }
}
