const nodemailer = require('nodemailer');

async function sendEmail(Topic,Content) {

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false, // use SSL
  auth: {
    user: 'smtp@mailtrap.io',
    pass: '401d794f85cdc2d77b21ed2624a754fc',
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: 'authConfirmation@demomailtrap.co',
  to: 'mehdics100@gmail.com',
  subject: Topic,
  text: Content
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
}

module.exports={sendEmail};