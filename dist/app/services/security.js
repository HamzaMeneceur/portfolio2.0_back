import bcrypt from 'bcryptjs';
import { decode } from './jwt.js';
export async function encodePassword(password) {
    const salt = process.env.BCRYPT_SALT;
    return await bcrypt.hash(password, Number(salt));
}
;
export async function passwordMatch(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}
;
export async function isConnected(req, res, next) {
    try {
        const tokenSession = decode(req.session.token);
        if (tokenSession && typeof tokenSession === "object")
            next();
        else {
            res.status(401).redirect('/v1/admin/s/');
        }
    }
    catch (err) {
        res.status(401).redirect('/v1/admin/s/');
    }
}
