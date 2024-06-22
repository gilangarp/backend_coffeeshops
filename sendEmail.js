const nodemailer = require('nodemailer');

// SMTP Server configuration
const SMTP_SERVER = "smtp.gmail.com";
const SMTP_PORT = 587;

// Sender's credentials
const USER_EMAIL = "gilangarya2001.ap@gmail.com";
const PASS_EMAIL = "sfdgfshh";

// Recipient's email address
const recipientEmail = "gilangarya275@gmail.com";

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    host: SMTP_SERVER,
    port: SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: USER_EMAIL,
        pass: PASS_EMAIL
    }
});


// Prepare email message
let mailOptions = {
    from: USER_EMAIL,
    to: recipientEmail,
    subject: 'Test Email from Node.js',
    text: 'Hello, this is a test email sent from Node.js using nodemailer!'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Failed to send email:", error.message);
    } else {
        console.log("Email sent successfully:", info.response);
    }
});
