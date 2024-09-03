import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { encodePassword } from "../services/security.js";
import APIError from "../services/error/APIError.js";
export default {
    async renderPrivacyPolicy(req, res, next) {
        try {
            res.status(200).render('legal/privacyPolicy');
        }
        catch (err) {
            console.log(err);
        }
    },
    async renderTermsOfUse(req, res, next) {
        try {
            res.status(200).render('legal/termsOfUse');
        }
        catch (err) {
            console.log(err);
        }
    },
    async renderSigninPage(req, res, next) {
        try {
            res.status(200).render('adminAuth/signin');
        }
        catch (err) {
            console.log(err);
        }
    },
    async renderProject(req, res, next) {
        try {
            res.status(200).render('gestion/project');
        }
        catch (err) {
            console.log(err);
        }
    },
    async renderNotFound(req, res, next) {
        try {
            res.status(404).send("404 not found");
        }
        catch (err) {
            console.log(err);
        }
    },
    async haveUser(req, res, next) {
        try {
            const result = await adminDataMapper.getUser();
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
        }
    },
    async signup(req, res, next) {
        const error = {
            message: 'Le mot de passe ne correspond pas'
        };
        const user = req.body;
        for (const userIn in user) {
            console.log(`Le conteneur est ${userIn} le contenu ${user[userIn]}`);
        }
        if (user.password !== user.confirm) {
            delete req.session.error;
            req.session.error = error.message;
            res.status(406).redirect('/v1/admin/s/signup');
            if (user.password === user.confirm && user.email) {
                user.password = await encodePassword(user.password);
                const hashUser = user;
                await adminDataMapper.addUser(hashUser);
                res.status(201).redirect('/v1/admin/s/');
            }
        }
        else {
            const alert = new APIError('Donnée manquante en entrer', 500);
            next(error);
        }
    },
    async renderSignupPage(req, res, next) {
        let error;
        const errorMessage = [req.session.error];
        res.status(200).render('adminAuth/signup', { msg: errorMessage[0] });
    }
};
