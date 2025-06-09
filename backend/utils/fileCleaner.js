const fs = require('fs');
const path = require('path');

const uploadsPath = path.join(__dirname, '../uploads');
const oneHour = 1000 * 60 * 60;

function cleanOldFiles() {
  const now = Date.now();

  fs.readdir(uploadsPath, (err, files) => {
    if (err) return console.error('Failed to read uploads:', err);

    files.forEach(file => {
      const filePath = path.join(uploadsPath, file);
      fs.stat(filePath, (err, stats) => {
        if (!err && now - stats.mtimeMs > oneHour) {
          fs.unlink(filePath, err => {
            if (err) console.error('Delete failed:', filePath);
            else console.log('Deleted old file:', filePath);
          });
        }
      });
    });
  });
}

function scheduleFileCleanup() {
  setInterval(cleanOldFiles, oneHour);
}

module.exports = { cleanOldFiles, scheduleFileCleanup };
