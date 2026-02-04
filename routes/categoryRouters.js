const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/register-category',categoryController.registerCategory);
router.post('/search-category',categoryController.searchCategory);
router.post('/update-category/:id',categoryController.updateCategory);
router.post('/delete-category/:id',categoryController.deleteCategory);

module.exports = router;