// Import required modules once at the top
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Admin = require('../models/Admin');

// Create Admin
const createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Generate Professional ID and General ID
    const generalId = 'GEN-' + crypto.randomBytes(4).toString('hex');
    const adminId = 'ADM-' + crypto.randomBytes(4).toString('hex');

    // Hash the password using SHA-256
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create a new admin
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      generalId,
      adminId,
      password: hashedPassword, // Make sure to store the hashed password
    });

    // Save the admin to the database
    await newAdmin.save();

    // Configure email transporter with better error handling
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Helps in some network environments
      }
    });

    // HTML email template with professional design and FeastFast branding
    const emailTemplate = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to FeastFast Admin Panel</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <!-- Enhanced Header with FeastFast logo -->
      <div style="background-color: #FF5722; padding: 30px 20px; text-align: center;">
        <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
          <tr>
            <td>
              <!-- Circle with F letter - more polished -->
              <div style="display: inline-block; width: 60px; height: 60px; background-color: #FFFFFF; border-radius: 30px; margin-right: 15px; vertical-align: middle; position: relative; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: Arial, sans-serif; font-size: 36px; font-weight: bold; color: #FF5722;">F</div>
              </div>
            </td>
            <td>
              <!-- FeastFast text - larger and more prominent -->
              <div style="display: inline-block; vertical-align: middle; font-family: Arial, sans-serif; font-size: 36px; font-weight: bold; color: #FFFFFF; letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">FeastFast</div>
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 40px 30px;">
        <h2 style="color: #FF5722; margin-top: 0; margin-bottom: 20px; font-weight: 600; font-size: 26px;">Welcome to the FeastFast Admin Team!</h2>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">Hello ${firstName},</p>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">Your admin account has been successfully created. You now have access to the FeastFast Admin Panel, where you can manage the platform's operations and help deliver exceptional food experiences to our customers.</p>
        
        <div style="background-color: #f7f7f7; border-left: 4px solid #FF5722; padding: 20px; margin-bottom: 30px; border-radius: 0 4px 4px 0;">
          <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>Your Login Details:</strong></p>
          <p style="font-size: 16px; margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; margin: 0 0 8px 0;"><strong>Admin ID:</strong> ${adminId}</p>
          <p style="font-size: 16px; margin: 0 0 8px 0;"><strong>Password:</strong> ${password}</p>
          <p style="font-size: 14px; margin: 15px 0 0 0; color: #555; font-style: italic;">Please change your password after first login for security purposes.</p>
        </div>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="https://admin.feastfast.com/login" style="background-color: #FF5722; color: white; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 2px 5px rgba(255,87,34,0.3); transition: all 0.3s ease;">Access Admin Panel</a>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5;">If you have any questions or need assistance, please contact our technical support team at <a href="mailto:support@feastfast.com" style="color: #FF5722; text-decoration: none; font-weight: 500;">support@feastfast.com</a>.</p>
        
        <p style="font-size: 16px; line-height: 1.5; margin-top: 25px;">Best regards,</p>
        <p style="font-size: 16px; line-height: 1.5; font-weight: 600; color: #444;">The FeastFast Team</p>
      </div>
      
      <!-- Enhanced Footer -->
      <div style="background-color: #333; color: #fff; padding: 25px 20px; text-align: center; font-size: 14px; border-radius: 0 0 4px 4px;">
        <p style="margin: 0 0 12px 0;">© ${new Date().getFullYear()} FeastFast. All rights reserved.</p>
        <p style="margin: 0 0 18px 0; color: #aaa;">This is an automated message. Please do not reply.</p>
        <div style="margin-top: 15px;">
          <a href="https://feastfast.com/terms" style="color: #fff; text-decoration: none; margin: 0 12px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 2px;">Terms of Service</a>
          <a href="https://feastfast.com/privacy" style="color: #fff; text-decoration: none; margin: 0 12px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 2px;">Privacy Policy</a>
        </div>
      </div>
    </div>
  </body>
</html>
    `;

    const mailOptions = {
      from: `"FeastFast Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to FeastFast Admin Panel - Your Account Details',
      html: emailTemplate,
    };

    // Send the email with detailed error handling
    try {
      await transporter.sendMail(mailOptions);
      
      
      res.status(201).json({ 
        success: true,
        message: 'Admin created successfully and welcome email sent',
       
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      
      // Still return success for admin creation, but note email failure
      res.status(201).json({ 
        success: true,
        message: 'Admin created successfully but welcome email failed to send',
        emailError: emailError.message,
        admin: {
          id: newAdmin._id,
          firstName,
          lastName,
          email,
          adminId,
          generalId
        }
      });
    }
  } catch (err) {
    console.error('Admin creation error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error creating admin account', 
      error: err.message 
    });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching admins',
      error: err.message
    });
  }
};

// Get single admin
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (err) {
    console.error('Error fetching admin:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin',
      error: err.message
    });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    
    // Find and update the admin
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: admin
    });
  } catch (err) {
    console.error('Error updating admin:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating admin',
      error: err.message
    });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting admin:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting admin',
      error: err.message
    });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Hash the provided password for comparison
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Check if password matches
    if (admin.password !== hashedPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin._id,
        adminId: admin.adminId,
        email: admin.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: err.message
    });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Generate a random new password
    const newPassword = crypto.randomBytes(8).toString('hex');

    // Hash the new password
    const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

    // Update admin's password in the database
    admin.password = hashedPassword;
    await admin.save();

    // Send new password via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Hello ${admin.firstName},\n\nYour password has been reset.\n\nYour new password is: ${newPassword}\n\nPlease log in with this new password.\n\nRegards,\nAdmin Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset successful, new password sent via email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin,
  forgotPassword
};