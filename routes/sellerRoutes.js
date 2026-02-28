const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController')

router.post('/create-seller',sellerController.createSeller);
router.post('/search-seller',sellerController.searchSeller);
router.post('/update-seller/:id',sellerController.updateSeller);
router.post('/remove-seller/:id',sellerController.removeSeller);
router.post('/get-all-products/:id',sellerController.getAllProductsOfASeller);
router.post('/get-all-products-seller-details/:id',sellerController.getProductWithSellerDetails);

module.exports = router;