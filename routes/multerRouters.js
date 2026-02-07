const express = require("express");
const router = express.Router();
const upload = require('../config/multer');
const multerController = require('../controllers/multerController')

router.post('/upload-pdf', upload.single('pdf'), multerController.uploadPDF);

module.exports = router;