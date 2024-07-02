import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_NOREPLY,
        pass: process.env.MAIL_NOREPLY_PASS
    }
})

