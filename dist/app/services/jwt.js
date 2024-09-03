import jwt from 'jsonwebtoken';
import APIError from './error/APIError';
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
    return jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            new APIError('invalid token', 500);
        }
    });
}
