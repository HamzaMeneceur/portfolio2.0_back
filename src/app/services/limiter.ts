import {rateLimit} from 'express-rate-limit';
import { NextFunction,Request,Response } from "express";


export const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 5,
        standardHeaders: true,
        legacyHeaders: false,
        handler: function (req: Request,res: Response,next: NextFunction){
            req.session.limitReached = true;
            req.session.limitExpiration = Date.now() + 15 * 60 * 1000; 
            res.status(429).render('adminAuth/signin',{limitReached: true, msg: "Vous avez dépassé la limite d'essais. La connexion est bloqué temporairement."})
        }
    })