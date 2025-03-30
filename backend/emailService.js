// Load environment variables from the .env file
require('dotenv').config();

const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

// Add validations
app.post('/create-admin', 
  body('email').isEmail().withMessage('Invalid email format'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with creating admin
  }
);

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any other service you're using
  auth: {
    user: process.env.EMAIL_USER,  // Access the email from .env file
    pass: process.env.EMAIL_PASS,  // Access the password from .env file
  },
});

// Function to send an email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email from .env
    to: to,  // Recipient email
    subject: subject,
    text: text,  // Plain text content
    html: html,  // HTML content (optional)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Example usage of sendEmail function
sendEmail(
  'adminemail@admin.com',  // Admin's email
  'Admin Account Created Successfully', 
  'Your admin account has been created. Here are your login details...',
  '<h1>Your admin account has been created successfully!</h1><p>Login ID: adminID123</p><p>Password: yourgeneratedpassword</p>'
);

