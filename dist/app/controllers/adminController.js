import adminDataMapper from "../dataMappers/adminDataMapper.js";
import { encodePassword } from "../services/security.js";
import APIError from "../services/error/APIError.js";
export default {
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
            res.status(200).json('not on bdd');
        }
        else {
            error = new APIError('Email présent en base de données', 500);
            next(error);
        }
    },
    async signup(req, res, next) {
        let error;
        const user = req.body;
        if (user.password && user.email) {
            user.password = await encodePassword(user.password);
            const hashUser = user;
            const { error, result } = await adminDataMapper.addUser(hashUser);
            console.log(user);
            res.status(201).json(result);
        }
        else {
            error = new APIError('Donnée manquante en entrer', 500);
            next(error);
        }
    }
};
