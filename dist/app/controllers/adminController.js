import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { encodePassword } from "../services/security.js";
import APIError from "../services/error/APIError.js";
export default {
    async renderSigninPage(req, res, next) {
        try {
            console.log('je suis pret a envoyer le rendu');
            res.render('adminAuth/signin');
        }
        catch (err) {
            console.log('je suis la');
            console.log(err);
        }
    },
    async haveUser(req, res, next) {
        try {
            const result = await adminDataMapper.getUser();
            console.log('i here');
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
        }
    },
    async verifyUser(req, res, next) {
        let error;
        const email = req.body;
        const result = await adminDataMapper.ifUser(email);
        console.log('controller', result);
        if (!result.exists) {
            console.log("C'est ok");
        }
        else {
            error = new APIError('Email déjà présente en base de données', 409);
            next(error);
        }
    },
    async signup(req, res, next) {
        let error;
        const user = req.body;
        console.log(user);
        if (user.password && user.email) {
            user.password = await encodePassword(user.password);
            const hashUser = user;
            const result = await adminDataMapper.addUser(hashUser);
            res.status(201).redirect('/v1/admin/s/');
        }
        else {
            error = new APIError('Donnée manquante en entrer', 500);
            next(error);
        }
    },
    async renderSignupPage(req, res, next) {
        let error;
        const errorMessage = [req.session.error];
        console.log("Le message d'erreur et ", errorMessage.length);
        console.log(req.session.error);
        res.status(200).render('adminAuth/signup', { msg: errorMessage[0] });
    }
};
