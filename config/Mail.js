const nodemailer = require('nodemailer');
const {google} = require('googleapis')
//get these from .env file

const CLIENT_ID = '286130904377-d8husd5264fmupvmciavvmk9vnfb66pp.apps.googleusercontent.com'
const CLEINT_SECRET ='7daExD37I7mmaqQogaHVWP8W'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04-P5qBMqn3u_CgYIARAAGAQSNwF-L9IraQQbhNDvHHNmNynHCXkBHh80ucq597ED_GVBiqBTDlB8ktzv1Uv0JXhP2dvrdgu9ReU'



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

