
const sgMail = require('../config/sendgrid');

exports.sendSubscriptionEmail = async (req, res) => {
  const { name, email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Thank You for Subscribing!',
    text: `Hi ${name || 'there'},\n\nThank you for subscribing to our newsletter!`,
    html: `
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for subscribing to our newsletter!</p>
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
};
