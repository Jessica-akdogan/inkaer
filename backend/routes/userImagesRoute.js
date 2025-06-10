const express = require('express');
const {
  getUserImages,
  proxyUserImage
} = require('../controllers/userImagesController');

const router = express.Router();

router.get('/', getUserImages);         
router.get('/proxy', proxyUserImage);   

module.exports = router;
