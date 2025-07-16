const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: String,
  filePath: String,
  contentType: String,
}, { timestamps: true }); 

module.exports = mongoose.model('Model', modelSchema);
