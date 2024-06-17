import bcrypt from 'bcryptjs';
export async function encodePassword(password) {
    const salt = process.env.BCRYPT_SALT;
    return await bcrypt.hash(password, Number(salt));
}
;
export async function passwordMatch(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}
;
