const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/create', productController.create)
router.post('/read', productController.read)
router.post('/update/:id', productController.update)
router.post('/delete/:id', productController._delete)


module.exports = router;