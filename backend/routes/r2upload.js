const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const admin = require('../config/firebaseAdmin');

const router = express.Router();

// Memory storage for multer
const storage = multer.memoryStorage();

// Multer config: limit to 1MB and allow only images
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files allowed!'));
    }
    cb(null, true);
  }
});

// Cloudflare R2 config
const r2 = new AWS.S3({
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ENDPOINT,
  signatureVersion: 'v4',
  region: 'auto',
});

// Upload route
router.post('/', (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'Image is too large (max 5MB)' });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(400).json({ message: 'Upload error', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Unexpected error', error: err.message });
    }
    next();
  });
}, async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No image uploaded' });

    const fileKey = `users/${userId}/${Date.now()}_${file.originalname}`;

    await r2.putObject({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }).promise();

    const fileUrl = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${fileKey}`;
    res.status(200).json({ imageUrl: fileUrl });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});




module.exports = router;
