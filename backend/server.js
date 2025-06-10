require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { cleanOldFiles, scheduleFileCleanup } = require('./utils/fileCleaner');
const uploadRoutes = require('./routes/uploadRoute');
const emailRoutes = require('./routes/emailRoute');
const imageUploadRoutes = require('./routes/r2uploadRoute');
const getUserImagesRoutes = require('./routes/userImagesRoute');


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));

// Clean old files
cleanOldFiles();
scheduleFileCleanup();

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/upload', uploadRoutes);
app.use('/send-email', emailRoutes);
app.use('/image-upload', imageUploadRoutes);
app.use('/api/user-images', getUserImagesRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
