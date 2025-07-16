const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToGridFS = (req, res, next) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const db = mongoose.connection.db;
  const bucket = new GridFSBucket(db, { bucketName: 'models' });

  const readableStream = Readable.from(req.file.buffer);

  const stream = bucket.openUploadStream(`${Date.now()}-${req.file.originalname}`, {
    contentType: req.file.mimetype,
    metadata: { originalName: req.file.originalname },
  });

  readableStream.pipe(stream)
    .on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Upload failed' });
    })
    .on('finish', () => {
      req.file.gridfsFileId = stream.id;
      req.file.gridfsFileName = stream.filename;
      next();
    });
};

module.exports = { upload, uploadToGridFS };
