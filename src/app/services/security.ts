import bcrypt from 'bcryptjs'

export async function encodePassword(password:string) {
    const salt = process.env.BCRYPT_SALT
    return await bcrypt.hash(password, Number(salt));
};

export async function passwordMatch(password: string, passwordHash: string) {
    return bcrypt.compare(password,passwordHash);
};