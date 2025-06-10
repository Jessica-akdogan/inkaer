const AWS = require('aws-sdk');
const mime = require('mime-types');
const admin = require('../config/firebaseAdmin');

// ✅ R2 client config
const r2 = new AWS.S3({
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_ENDPOINT,
  signatureVersion: 'v4',
  region: 'auto',
});

// ✅ Controller: Get user images list
exports.getUserImages = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const result = await r2.listObjectsV2({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: `users/${userId}/`,
    }).promise();

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
    const obj = await r2.getObject({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }).promise();

    if (!obj.Body) {
      return res.status(404).json({ message: 'Image not found (empty body)' });
    }

    const contentType = mime.lookup(key) || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(obj.Body);
  } catch (err) {
    console.error('Proxy error for key:', key, '\nError:', err);
    res.status(500).json({ message: 'Failed to proxy image' });
  }
};
