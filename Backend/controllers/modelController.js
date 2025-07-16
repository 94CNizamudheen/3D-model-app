

const Model = require('../models/model');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

exports.uploadModel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const newModel = new Model({
      name: req.body.name,
      filePath: req.file.gridfsFileName, 
      contentType: req.file.mimetype,
    });

    await newModel.save();
    res.status(201).json({ message: 'Model uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllModels = async (req, res) => {
  try {
    const models = await Model.find({}, 'name _id createdAt');
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ error: 'Model not found' });

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'models' });

    const downloadStream = bucket.openDownloadStreamByName(model.filePath);

    res.set('Content-Type', model.contentType);
    res.set('Content-Disposition', `inline; filename="${model.filePath}"`);

    downloadStream
      .on('error', (err) => {
        console.error('GridFS download error:', err);
        res.status(404).json({ error: 'File not found in GridFS' });
      })
      .pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
