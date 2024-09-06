import bcrypt from 'bcryptjs';
import { decode } from './jwt.js';
/**
 *
 * @param password Besoin d'un mot de passe
 * @returns Le mot de passe et encrypté
 */
export async function encodePassword(password) {
    const salt = process.env.BCRYPT_SALT;
    return await bcrypt.hash(password, Number(salt));
}
;
/**
 *
 * @param password Password saisie par l'utilisateur
 * @param passwordHash Password en BDD
 * @returns Boolean
 */
export async function passwordMatch(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}
;
export async function isConnected(req, res, next) {
    try {
        const tokenSession = decode(req.session.token);
        if (tokenSession && typeof tokenSession === "object") {
            console.log(tokenSession.exp);
            next();
        }
        else {
            res.status(401).redirect('/v1/admin/s/');
        }
    }
    catch (err) {
        res.status(401).redirect('/v1/admin/s/');
    }
}
