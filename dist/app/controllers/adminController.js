import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { encodePassword, passwordMatch } from "../services/security.js";
import APIError from "../services/error/APIError.js";
import { encode, decode } from "../services/jwt.js";
export default {
    async renderPrivacyPolicy(req, res, next) {
        try {
            res.status(200).render('legal/privacyPolicy');
        }
        catch (err) {
            new APIError('Une erreur interne et survenu dans le rendu de privacy policy', 500);
        }
    },
    async renderTermsOfUse(req, res, next) {
        try {
            res.status(200).render('legal/termsOfUse');
        }
        catch (err) {
            new APIError('Une erreur interne et survenu dans le rendu de terms of use', 500);
        }
    },
    async renderSigninPage(req, res, next) {
        try {
            const msg = req.session.error;
            const now = Date.now();
            if (req.session.limitReached && req.session.limitExpiration && req.session.limitExpiration > now) {
                res.status(429).render('adminAuth/signin', { limitReached: true, msg: "Vous avez dépassé la limite d'essais. La connexion est bloqué temporairement." });
            }
            else {
                res.status(200).render('adminAuth/signin', { limitReached: false, msg });
            }
        }
        catch (err) {
            new APIError('Une erreur interne et survenu dans le rendu de signin', 500);
        }
    },
    async renderProject(req, res, next) {
        try {
            console.log(req.query.projectSelected, 'Coucou');
            let email;
            let result;
            let project;
            if (req.session.token) {
                const tokenUser = decode(req.session.token);
                email = tokenUser.data.email;
            }
            if (email) {
                result = await adminDataMapper.selectAllProjectConnected(email);
                if (result) {
                    project = result.find((selected) => selected.id == req.query.projectSelected);
                    console.log(project);
                }
            }
            // Il faudrait tester la condition ou je n'ai pas de projets doit-je faire une condition dans ejs ? 
            res.status(200).render('gestion/project', { projects: result, project });
        }
        catch (err) {
            new APIError('Une erreur interne et survenu dans le rendu de project', 500);
        }
    },
    async renderNotFound(req, res, next) {
        try {
            res.status(404).send("404 not found");
        }
        catch (err) {
            new APIError('Une erreur interne et survenu', 500);
        }
    },
    async authUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                delete req.session.error;
                throw new Error(req.session.error = `Le champs email est pas remplit`);
            }
            if (!password) {
                delete req.session.error;
                throw new Error(req.session.error = `Le champs password est pas remplit`);
            }
            const result = await adminDataMapper.authUser(email);
            const passCheck = result.password;
            const user = await passwordMatch(password, passCheck);
            if (user) {
                delete req.session.token;
                delete result.password;
                const token = encode(result);
                console.log(token);
                console.log('result => ' + user);
                req.session.token = token;
                res.status(200).redirect('/v1/admin/s/project');
            }
            else {
                delete req.session.error;
                throw new Error(req.session.error = `Les informations d'identification que vous avez fournies sont incorrectes. Veuillez vérifier votre adresse email et votre mot de passe, puis réessayer.`);
            }
        }
        catch (err) {
            res.status(406).redirect('/v1/admin/s/');
        }
    },
    async signup(req, res, next) {
        req.session.limitReached = false;
        req.session.limitExpiration = null;
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
        }
        else if (req.session.error) {
            res.status(400).redirect("/v1/admin/s/signup");
        }
        else if (user.password === user.confirm && user.email) {
            user.password = await encodePassword(user.password);
            const hashUser = user;
            await adminDataMapper.addUser(hashUser);
            res.status(201).redirect('/v1/admin/s/');
        }
        else {
            const alert = new APIError('Donnée manquante en entrer', 500);
            next(error);
        }
    },
    async addProject(req, res, next) {
        try {
            let email;
            if (req.session.token) {
                const tokenUser = decode(req.session.token);
                email = tokenUser.data.email;
            }
            if (req.body && email) {
                const { name, projectType, link } = req.body;
                const result = await adminDataMapper.addProject(name, projectType, link, email);
                res.status(201).redirect('/v1/admin/s/project');
            }
            else {
                // L'utilisateur est pas connecter retour à la page de connexion
                res.status(406).redirect('/v1/admin/s');
            }
        }
        catch (err) {
            new APIError("Une erreur c'est produite", 500);
        }
    },
    async renderSignupPage(req, res, next) {
        const errorMessage = [req.session.error];
        res.status(200).render('adminAuth/signup', { msg: errorMessage[0] });
    }
};
