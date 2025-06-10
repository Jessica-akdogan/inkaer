require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const uploadRoutes = require('./routes/uploadRoute');
const emailRoutes = require('./routes/emailRoute');
const imageUploadRoutes = require('./routes/r2uploadRoute');
const getUserImagesRoutes = require('./routes/userImagesRoute');


const app = express();
const PORT = process.env.PORT || 5000;

app.get('/run-cleanup', (req, res) => {
  require('./utils/fileCleaner');
  res.send('Cleanup started.');
});


// ✅ Ensure uploads folder exists (IMPORTANT FOR RENDER)
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}


// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));



// Serve static files
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/upload', uploadRoutes);
app.use('/send-email', emailRoutes);
app.use('/image-upload', imageUploadRoutes);
app.use('/api/user-images', getUserImagesRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
