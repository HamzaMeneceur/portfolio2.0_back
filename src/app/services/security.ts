import bcrypt from 'bcryptjs'

export async function encodePassword(password:string) {
    return await bcrypt.hash(password, process.env.BCRYPT_SALT);
};

export async function passwordMatch(password: string, passwordHash: string) {
    return bcrypt.compare(password,passwordHash);
};