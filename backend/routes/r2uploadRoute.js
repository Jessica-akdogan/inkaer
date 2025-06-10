
const express = require('express');
const multer = require('multer');
const { uploadToR2 } = require('../controllers/r2uploadController');
const upload = require('../middleware/r2MulterConfig');


const router = express.Router();

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
}, uploadToR2);

module.exports = router;
