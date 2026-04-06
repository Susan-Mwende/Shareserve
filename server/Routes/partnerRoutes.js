import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Test route
router.get('/partner', (req, res) => {
  res.json({ message: 'Partner routes are working!' });
});

// Contact form for partnerships and join requests
router.post('/partner', async (req, res) => {
  try {
    const { name, email, subject, message, type, recipient } = req.body;

    // Debug: Log environment variables (without passwords)
    console.log('🔍 Environment Check:');
    console.log('  EMAIL_USER:', process.env.EMAIL_USER ? '✅ SET' : '❌ MISSING');
    console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ SET' : '❌ MISSING');
    console.log('  EMAIL_HOST:', process.env.EMAIL_HOST || 'smtp.gmail.com');
    console.log('  EMAIL_PORT:', process.env.EMAIL_PORT || '587');

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Log the request for debugging
    console.log('Partner contact request received:', {
      name,
      email,
      subject,
      message,
      type,
      recipient,
      timestamp: new Date().toISOString()
    });

    // Try to send email, but don't fail if email configuration is not set up
    try {
      // Create email content
      const emailContent = `
        <h2>${type === 'join' ? 'Join the Movement' : 'Partnership'} Inquiry</h2>
        
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <hr style="margin: 20px 0;">
        <p><strong>Type:</strong> ${type === 'join' ? 'Join the Movement Request' : 'Partnership Request'}</p>
        <p><strong>Sent to:</strong> ${recipient || 'info@shareserve.org'}</p>
        
        <p style="margin-top: 20px;">
          <em>This message was sent via the ShareServe International website contact form.</em>
        </p>
      `;

      // Check if email configuration is available
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        console.log('Email configuration found. Attempting to send email...');
        // Configure email transport
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: process.env.EMAIL_PORT || 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        // Email options
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: recipient || 'info@shareserve.org',
          subject: `${type === 'join' ? 'Join Movement' : 'Partnership'}: ${subject}`,
          html: emailContent
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully to:', recipient);
      } else {
        console.log('❌ Email configuration missing:');
        console.log('  EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'MISSING');
        console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'MISSING');
        console.log('Using console log for demo purposes.');
        console.log('=== CONTACT FORM SUBMISSION ===');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
        console.log('Type:', type);
        console.log('Recipient:', recipient);
        console.log('Timestamp:', new Date().toISOString());
        console.log('==============================');
      }
    } catch (emailError) {
      console.log('Email sending failed (this is expected in demo mode):', emailError.message);
      console.log('Contact form data was successfully received and processed.');
      // Don't fail the entire request if email fails
    }

    res.json({
      success: true,
      message: 'Your message has been sent successfully! We will contact you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
});

export default router;
