require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const { execSync } = require('child_process');
const multer = require('multer');
const cron = require('node-cron');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🧹 HOURLY CLEANUP TASK - delete all files in /uploads
cron.schedule('0 * * * *', () => {
  const uploadsDir = path.resolve(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return console.error('Error reading uploads directory:', err);
    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      fs.unlink(filePath, err => {
        if (err) console.error(`Failed to delete ${file}:`, err);
      });
    });
  });
  console.log('🧹 Uploads directory cleaned up.');
});

// 🚀 Upload and Convert Endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  const originalName = req.file.originalname.toLowerCase();
  const originalExt = path.extname(originalName);

  if (!originalExt.endsWith('.step') && !originalExt.endsWith('.stp')) {
    return res.status(400).json({ error: 'Unsupported file type. Please upload a .STEP or .STP file.' });
  }

  const uploadsDir = path.resolve(__dirname, 'uploads');
  const preferredExt = '.stp';
  const renamedPath = path.join(uploadsDir, `${req.file.filename}${preferredExt}`);

  try {
    fs.copyFileSync(req.file.path, renamedPath);
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.error('Failed to move uploaded file:', err);
    return res.status(500).json({ error: 'Error moving uploaded file.' });
  }

  const filePath = renamedPath;
  const outputFileName = `${Date.now()}.glb`;
  const outputFilePath = path.join(uploadsDir, outputFileName);
  const scriptPath = path.resolve(__dirname, 'convert.py');

  console.log('Checking file before conversion:', filePath);
  console.log('Exists:', fs.existsSync(filePath));

  try {
    console.log('Running FreeCAD conversion...');
    const result = execSync(
      `"C:\\Program Files\\FreeCAD 1.0\\bin\\freecadcmd.exe" "${scriptPath}" "${filePath}" "${outputFilePath}"`,
      { stdio: 'pipe' }
    );

    console.log('FreeCAD Output:', result.toString());

    if (!fs.existsSync(outputFilePath)) {
      throw new Error(`Output GLB was not created at ${outputFilePath}`);
    }

    console.log('Conversion successful:', outputFilePath);
    res.json({ url: `/uploads/${outputFileName}` });
  } catch (err) {
    console.error('FreeCAD conversion error:', err.message);
    res.status(500).json({ error: 'Failed to convert file. Ensure FreeCAD is installed and configured correctly.' });
  }
});


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
