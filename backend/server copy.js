const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"3onsConnect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thank You for Subscribing!',
    html: `
  <p>Hi ${name || 'there'},</p>
  <p>Thank you for subscribing to our newsletter! We're excited to have you on board.</p>
  <p>Best regards,<br/>The 3onsConnect Team</p>
`,

   // text: `Hi ${name || 'there'},\n\nThank you for subscribing to our newsletter! We're excited to have you on board.\n\nBest regards,\nYour 3onsConnect Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
