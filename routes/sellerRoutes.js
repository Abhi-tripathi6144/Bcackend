const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController')

router.post('/register-seller',sellerController.registerSeller);
router.post('/search-seller',sellerController.searchSeller);
router.post('/update-seller/:id',sellerController.updateSeller);
router.post('/remove-seller/:id',sellerController.removeSeller);

module.exports = router;