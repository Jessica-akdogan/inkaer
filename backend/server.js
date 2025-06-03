require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const multer = require('multer');


const app = express();
const PORT = process.env.PORT || 5000
app.use(cors({ origin: process.env.CLIENT_URL,
  credentials: true
 }));
app.use(bodyParser.json());
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))


// Clean up old files in /uploads (older than 1 hour)
const uploadsPath = path.join(__dirname, 'uploads')
const oneHour = 1000 * 60 * 60
const now = Date.now()

fs.readdir(uploadsPath, (err, files) => {
  if (err) {
    console.error('Failed to read uploads folder:', err)
    return
  }

  files.forEach(file => {
    const filePath = path.join(uploadsPath, file)
    fs.stat(filePath, (err, stats) => {
      if (err) return console.error('Stat error:', err)

      if (now - stats.mtimeMs > oneHour) {
        fs.unlink(filePath, err => {
          if (err) console.error('Failed to delete:', filePath, err)
          else console.log('Deleted old file:', filePath)
        })
      }
    })
  })
})

// Serve static files
app.use('/uploads', express.static(uploadsPath))

// Upload endpoint
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.')
 //const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`
 const fileUrl = `${process.env.SERVER_URL || `http://localhost:${PORT}`}/uploads/${req.file.filename}`

  res.json({ url: fileUrl })
})



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




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
