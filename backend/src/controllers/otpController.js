


const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Initialize Prisma Client
require('dotenv').config();

const googleEmail = process.env.GOOGLE_EMAIL;
const googleAppPassword = process.env.GOOGLE_APP_PASSWORD;

// Validate environment variables
if (!googleEmail || !googleAppPassword) {
  throw new Error('Missing required environment variables: GOOGLE_EMAIL or GOOGLE_APP_PASSWORD');
}

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: googleEmail,
    pass: googleAppPassword,
  },
});

/**
 * Send OTP via email and save it to the database
 * @param {string} sendTo - Email address to send the OTP to
 * @param {string} otp - The OTP code
 */
const emailOtp = async (sendTo, otp) => {

  const emailContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
    <div style="text-align: center; padding: 10px;">
      <img src="https://auto-doc-seven.vercel.app/autodoc-logo.png" alt="AutoDoc Verifier Logo" style="width: 100px; margin-bottom: 20px;">
    </div>
    <div style="background-color: #ff4d4d; padding: 20px; border-radius: 4px; color: #fff; text-align: center;">
      <h1 style="margin: 0; font-size: 20px;">Your OTP Code</h1>
    </div>
    <div style="padding: 20px; text-align: center;">
      <p style="font-size: 16px; color: #333;">Hi there,</p>
      <p style="font-size: 16px; color: #333;">Your OTP code is:</p>
      <h2 style="font-size: 24px; color: #ff4d4d; margin: 10px 0;">${otp}</h2>
      <p style="font-size: 14px; color: #666;">This code is valid for 5 minutes. Please do not share it with anyone.</p>
    </div>
    <div style="background-color: #f1f1f1; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
      <p style="margin: 0; font-size: 14px; color: #666;">Follow us on:</p>
      <div style="margin: 10px 0;">
        <a href="https://facebook.com" style="margin: 0 5px;">
          <img src="https://auto-doc-seven.vercel.app/fb-logo.png" alt="Facebook" style="width: 24px;">
        </a>
        <a href="https://twitter.com" style="margin: 0 5px;">
          <img src="https://auto-doc-seven.vercel.app/tw-logo.png" alt="Twitter" style="width: 24px;">
        </a>
        <a href="https://linkedin.com" style="margin: 0 5px;">
          <img src="https://auto-doc-seven.vercel.app/linkedin-logo.png" alt="LinkedIn" style="width: 24px;">
        </a>
        <a href="https://instagram.com" style="margin: 0 5px;">
          <img src="https://auto-doc-seven.vercel.app/ig-logo.png" alt="Instagram" style="width: 24px;">
        </a>
      </div>
      <p style="margin: 0; font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} AutoDoc Verifier. All rights reserved.</p>
    </div>
  </div>
`;


  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: sendTo,
    subject: "Your OTP Code for AutoDoc Verifier",
    html: emailContent,
  };

  try {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    // Save OTP to the database
    const otpToDb = await prisma.otp.create({
      data: {
        otp: otp,
        verifyWith: sendTo,
        createdAt: new Date(),
        expiresAt: expiresAt,
      },
    });

    // Send OTP via email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${sendTo}: ${otp}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

/**
 * Handle OTP sending request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const sendOtp = async (req, res) => {
  const { optedMethod, email } = req.body;

  if (!optedMethod || !email) {
    return res.status(400).json({ success: false, message: 'Missing required fields: optedMethod or email' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

  try {
    if (optedMethod === 'email') {
      await emailOtp(email, otp);
      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid optedMethod' });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

/**
 * Verify OTP
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */


const verifyOtp = async (req, res) => {
  const { otp, verifyWith } = req.body
  const otpFromDb = await prisma.otp.findFirst({
    where: {
      otp: otp,
      verifyWith: verifyWith,
      expiresAt: {
        gt: new Date() // Check that the current time is before the expiresAt time
      }
    }
  })
  if (otpFromDb) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ success: false })
  }
}

module.exports = { sendOtp, verifyOtp };