const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-email', async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Thank You for Subscribing!',
    text: `Hi ${name || 'there'},\n\nThank you for subscribing to our newsletter! We're excited to have you on board.\n\nBest regards,\n3onsConnect Team`,
    html: `
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for subscribing to our newsletter! We're excited to have you on board.</p>
      <p>Best regards,<br/><strong>3onsConnect Team</strong></p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error.message);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
