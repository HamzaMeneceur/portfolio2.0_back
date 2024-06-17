import bcrypt from 'bcryptjs';
export async function encodePassword(password) {
    return await bcrypt.hash(password, process.env.BCRYPT_SALT);
}
;
export async function passwordMatch(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}
;
