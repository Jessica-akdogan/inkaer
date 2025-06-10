
const express = require('express');
const upload = require('../middleware/multerConfig');
const { uploadLocalFile } = require('../controllers/uploadController');
const router = express.Router();

router.post('/', upload.single('file'), uploadLocalFile);

module.exports = router;
