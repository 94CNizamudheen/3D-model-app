const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');
const { upload, uploadToGridFS } = require('../storage/gridFsUploader');

router.post('/upload', upload.single('model'), uploadToGridFS, modelController.uploadModel);
router.get('/', modelController.getAllModels);
router.get('/:id', modelController.getModelById);

module.exports = router;
