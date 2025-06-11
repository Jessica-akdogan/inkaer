
exports.uploadLocalFile = (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
  
    const fileUrl = `${process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  };
    