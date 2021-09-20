const nodemailer = require('nodemailer');
const {google} = require('googleapis')
//get these from .env file
const CLIENT_ID = process.env.CLIENT_ID 
const CLEINT_SECRET = process.env.CLEINT_SECRET 
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  async function sendMail(To,Password) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'kajanan023@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'Easy Mail <kajanan023@gmail.com>',
        to: To,
        subject: 'Easy Mail password',
        text: Password,
        // html: '<h1>Hello from gmail email using API</h1>',
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  sendMail()
    .then((result) => console.log('Email sent...'))
    .catch((error) => console.log(error.message));

module.exports = sendMail
