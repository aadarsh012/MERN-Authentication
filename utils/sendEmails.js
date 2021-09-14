const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

const sendEmails = (options) => {
  const auth = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  };

  const transporter = nodemailer.createTransport(mailgun(auth));

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.to,
    subject: options.subject,
    html: options.text
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmails;
