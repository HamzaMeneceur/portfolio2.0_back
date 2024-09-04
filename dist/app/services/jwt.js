import jwt from 'jsonwebtoken';
import APIError from './error/APIError.js';
const secret = process.env.TOKEN_SECRET;
/**
 *
 * @param create Les informations sensible de l'utilisateur
 * @returns Retourne un token [expiration : 1 heure]
 */
export function encode(create) {
    return jwt.sign({
        data: create
    }, secret, { expiresIn: '1h' });
}
/**
 *
 * @param token Le jeton jwt
 * @returns Décode le token
 */
export function decode(token) {
    if (typeof token === "string") {
        return jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                new APIError('invalid token', 500);
            }
            else {
                return decoded;
            }
        });
    }
    else {
        new APIError('Not have token', 500);
    }
}
