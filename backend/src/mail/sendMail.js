const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {
    const mailer = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const thisMail = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    }

    try {
        await mailer.sendMail(thisMail);
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendEmail;