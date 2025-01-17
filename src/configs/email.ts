import nodemailer from 'nodemailer';


// Konfigurasi transporter menggunakan environment variables 
const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_MAIL,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
    },
}); 
export default transporter;
