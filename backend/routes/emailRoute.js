
const express = require('express');
const { sendSubscriptionEmail } = require('../controllers/emailController');
const router = express.Router();

router.post('/', sendSubscriptionEmail);

module.exports = router;
