import transporter from "../configs/email";
import { Response } from 'express-serve-static-core';

interface EmailMessage {
    from: string;
    to: string;
    subject: string;
    html: string;
}

const createEmail = (email: string, token: string): EmailMessage => {
    const emailObj: EmailMessage = {
        from: process.env.FROM_GMAIL || '',
        to: email,
        subject: "Activation Link", 
        html: `<h3>Click the link below to activate your account</h3>
               <p><a href="http://example.com/activate?token=${token}">Activate Now</a></p>` 
    };
    return emailObj;
};


const sendMail = (email: string, token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(createEmail(email, token), (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};

export default sendMail;