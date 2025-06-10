const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const mime = require('mime-types');
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

// ✅ Controller: Get user images list
exports.getUserImages = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const result = await r2.send(new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: `users/${userId}/`,
    }));
    

    const images = (result.Contents || []).map(obj => ({
      url: `/api/user-images/proxy?key=${encodeURIComponent(obj.Key)}`
    }));

    res.json({ images });
  } catch (err) {
    console.error('List error:', err);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
};

// ✅ Controller: Proxy image to client
exports.proxyUserImage = async (req, res) => {
  const encodedKey = req.query.key;
  if (!encodedKey) return res.status(400).json({ message: 'Missing key' });

  const key = decodeURIComponent(encodedKey);

  try {
    const result = await r2.send(new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }));

    res.setHeader('Content-Type', mime.lookup(key) || 'application/octet-stream');
res.setHeader('Cache-Control', 'public, max-age=3600');
result.Body.pipe(res);
  } catch (err) {
    console.error('Proxy error for key:', key, '\nError:', err);
    res.status(500).json({ message: 'Failed to proxy image' });
  }
};
