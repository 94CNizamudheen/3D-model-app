

const Model = require('../models/model');
const path = require('path');

exports.uploadModel = async (req, res) => {
  try {
    const newModel = new Model({
      name: req.body.name,
      filePath: req.file.path,
      contentType: req.file.mimetype,
    });
    await newModel.save();
    res.status(201).json({ message: 'Model uploaded successfully' });
  } catch (error) {
    console.error(error);
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

    res.sendFile(path.resolve(model.filePath));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
