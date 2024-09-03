import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { encodePassword } from "../services/security.js";
import APIError from "../services/error/APIError.js";
export default {
    async renderSigninPage(req, res, next) {
        try {
            console.log('je suis pret a envoyer le rendu');
            res.status(200).render('adminAuth/signin');
        }
        catch (err) {
            console.log('je suis la');
            console.log(err);
        }
    },
    async renderProject(req, res, next) {
        try {
            console.log('Je suis bien arriver');
            res.status(200).render('gestion/project');
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
            console.log('Je suis au premier if ', req.session.error);
            res.status(406).redirect('/v1/admin/s/signup');
            if (user.password === user.confirm && user.email) {
                user.password = await encodePassword(user.password);
                const hashUser = user;
                const result = await adminDataMapper.addUser(hashUser);
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
        console.log("Le message d'erreur et ", errorMessage.length);
        console.log(req.session.error);
        res.status(200).render('adminAuth/signup', { msg: errorMessage[0] });
    }
};
