// used for direct-to-cloud (R2) uploads
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files allowed!'));
    }
    cb(null, true);
  }
});

module.exports = upload;
