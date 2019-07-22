const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = process.env.SENDGRID_API_KEY;
const sendGridEmail = process.env.SENDGRID_EMAIL;

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: sendGridEmail, // change in production
        from: sendGridEmail, // change in production
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: sendGridEmail, // change in production
        from: sendGridEmail, // change in production
        subject: 'Sorry to see you go',
        text: `Goodbye, ${name}. Hope to see you soon.`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};