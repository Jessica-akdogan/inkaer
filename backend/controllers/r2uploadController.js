
const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const admin = require('../config/firebaseAdmin');

// Create S3 client
const r2 = new S3Client({
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  forcePathStyle: true, // needed for R2
});

exports.uploadToR2 = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No image uploaded' });

    const fileKey = `users/${userId}/${Date.now()}_${file.originalname}`;

    const uploadParams = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    await r2.send(new PutObjectCommand(uploadParams));
    

    const fileUrl = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${fileKey}`;
    res.status(200).json({ imageUrl: fileUrl });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};
