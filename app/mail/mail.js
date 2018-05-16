import nodemailer from 'nodemailer';
import mailSettings from '../config/mail';
import chalk from 'chalk';


const sendEmail = async (content) => {

  console.log( chalk.blue( "Preparing Email" ) );

  console.log(mailSettings);

  const transporter = nodemailer.createTransport({
    service: mailSettings.service,
    auth: {
      user: mailSettings.user,
      pass: mailSettings.password
    }
  });

  let mailOptions = {
    from: mailSettings.user,
    to: mailSettings.recipients,
    subject: 'New TelTwit Messages',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions);

};

module.exports = {
  sendEmail
};
