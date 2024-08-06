const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail', 
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent:', info.response)
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports = sendMail